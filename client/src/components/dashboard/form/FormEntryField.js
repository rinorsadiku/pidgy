import React from 'react';

import { form__error } from '../css/form.module.css';

export default ({
	input,
	placeholder,
	className,
	meta: { error, touched }
}) => {
	return (
		<>
			<input
				className={`${className} ${
					error && touched ? form__error : ''
				}`}
				placeholder={placeholder}
				{...input}
			/>
			<p>{error && touched ? error : ''}</p>
		</>
	);
};
