import React from 'react';

import { Field } from 'redux-form';
import FormEntryField from './FormEntryField';
import FormTextareaField from './FormTextareaField';

import f from '../css/form.module.css';
import { formEntryFields } from './formFields';

class FormEntries extends React.Component {
	renderFields() {
		return formEntryFields.map(({ label, name, type }) => {
			return (
				<div key={name} className={f['form__input-group']}>
					<label className={f['form__label']}>{label}</label>
					<Field
						placeholder={label}
						className={f['form__input']}
						name={name}
						component={
							type === 'input'
								? FormEntryField
								: FormTextareaField
						}
					/>
				</div>
			);
		});
	}

	render() {
		return <>{this.renderFields()}</>;
	}
}

export default FormEntries;
