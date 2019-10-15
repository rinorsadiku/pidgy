import React from 'react';

import { Field } from 'redux-form';

import { formPluginFields } from './formFields';
import FormField from './FormField';
import f from '../css/form-plugins.module.css';

class FormPlugins extends React.Component {
	renderPlugins() {
		return formPluginFields.map(({ acro, media, image }) => {
			return (
				<div
					className={`${f['form__plugin-group']} ${
						f[`form__plugin-group--${acro}`]
					}`}
					key={media}
				>
					<Field
						name={media}
						className={f['form__plugin']}
						placeholder={`Your ${media} profile page`}
						type="text"
						component={FormField}
					/>
					<img
						className={f['form__plugin--image']}
						src={image}
						alt={`${media} icon`}
					/>
				</div>
			);
		});
	}

	render() {
		return <div className={f['form__plugins']}>{this.renderPlugins()}</div>;
	}
}

export default FormPlugins;
