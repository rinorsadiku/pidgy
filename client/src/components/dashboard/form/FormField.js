import React from 'react';

export default ({
	input,
	placeholder,
	className,
	meta: { error, touched }
}) => {
	return (
		<>
			<input className={className} placeholder={placeholder} {...input} />
			<p>{error && touched ? error : ''}</p>
		</>
	);
};
