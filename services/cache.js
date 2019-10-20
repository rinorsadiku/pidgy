const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

// Get a reference to the default exec function
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
	this.useCache = true; // Flag to signify cache usage
	this.hashKey = JSON.stringify(options.key || ''); // Passing a key to set in the cache

	return this; // Making it chainable
};

mongoose.Query.prototype.exec = async function() {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}

	// The correct way to create a combined object, and returns a new one
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name
		})
	);

	// See if we have a value for 'key' in redis
	const cacheValue = await client.hget(this.hashKey, key);

	// If we do, return that
	if (cacheValue) {
		const doc = JSON.parse(cacheValue);
		// Hydrating the data so that we return a mongoose model and not a plain object
		// It's the same as new Blog({title: 'Lorem'})
		// Below we check the type of data, if its an array of values like we fetch all blogs,
		// we need to iterate through all of them and hydrate each one
		// Otherwise we're just going to hydrate one object i/e fetching a user
		return Array.isArray(doc)
			? doc.map(d => new this.model(d))
			: new this.model(doc);
	}

	// Otherwise, issue the query and store the result in redis
	const result = await exec.apply(this, arguments);

	// Setting the mongoose documents into valid JSON data for redis
	// Also setting the expiration date
	client.hset(this.hashKey, key, JSON.stringify(result));
	return result;
};

// exporting an object of methods, in this case clearing cache with a particular hashKey
module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	}
};
