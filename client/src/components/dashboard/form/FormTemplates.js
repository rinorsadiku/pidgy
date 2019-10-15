import React from 'react';
import { Field } from 'redux-form';

import f from '../css/form-templates.module.css';
import { formTemplateFields } from './formFields';

class FormTemplates extends React.Component {
	renderTemplates() {
		return formTemplateFields.map(({ color, image }) => {
			return (
				<div key={color} className={f['form__template']}>
					<Field
						name="template"
						component="input"
						id={color}
						className={f[`form__template-input--${color}`]}
						type="radio"
						value={color}
					/>
					<label
						htmlFor={color}
						className={f['form__template-label']}
					>
						<img
							className={f['form__template-img']}
							src={image}
							alt={`Template ${color}`}
						/>
					</label>
				</div>
			);
		});
	}

	render() {
		return (
			<div className={f['form__templates']}>{this.renderTemplates()}</div>
		);
	}
}

export default FormTemplates;
