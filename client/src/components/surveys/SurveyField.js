// SurveyField contains the logic to render a single label and text input
import React from 'react';

// Because this is rendered by the Field tag, redux has added a lot of methods and event handlers to the props of this function
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label htmlFor="">{label}</label>
			{/* Passing all the props and the event handlers to the input */}
			<input style={{ marginBottom: '5px' }} {...input} />
			<div
				style={{ marginTop: '-5px', marginBottom: '10px' }}
				className="red-text">
				{error && touched ? error : ''}
			</div>
		</div>
	);
};
