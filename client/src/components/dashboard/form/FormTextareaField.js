import React from 'react';

export default ({
	input,
	placeholder,
	className,
	meta: { error, touched }
}) => {
	return (
		<>
			<textarea
				className={className}
				placeholder={placeholder}
				{...input}
				rows="3"
			/>
			<p>{error && touched ? error : ''}</p>
		</>
	);
};
