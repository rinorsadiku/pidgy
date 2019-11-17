import React from 'react';
import DataContext from '../contexts/DataContext';

import { Field } from 'redux-form';
import f from '../css/form-checkbox.module.css';

class FormCheckbox extends React.Component {
	static contextType = DataContext;

	render() {
		return (
			<div className={f['form__switch']}>
				<Field
					name="custom"
					component="input"
					type="checkbox"
					id="custom"
					className={f['form__checkbox']}
					onChange={() =>
						this.context.setData({ custom: !this.context.custom })
					}
				/>

				<label htmlFor="custom" className={f['form__checkbox-label']}>
					<span className={f['form__checkbox-button']}></span>
				</label>
			</div>
		);
	}
}

export default FormCheckbox;
