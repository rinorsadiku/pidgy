import React from 'react';

import DataContext from '../contexts/DataContext';

import { HeadingFourth } from '../Typography';
import { SvgX } from '../Svg';

import f from '../css/form-recipients.module.css';

class FormRecipients extends React.Component {
	static contextType = DataContext;

	onDeleteRecipient(recipient) {
		this.context.setData({
			recipients: this.context.recipients.filter(el => el !== recipient)
		});
	}

	renderRecipients() {
		return this.context.recipients.reverse().map(recipient => {
			return (
				<li key={recipient} className={f['form__recipients-item']}>
					{recipient}
					<button
						onClick={() => this.onDeleteRecipient(recipient)}
						type="button"
						className={f['form__recipients-button']}
					>
						<SvgX />
					</button>
				</li>
			);
		});
	}

	render() {
		return (
			<div className={f['form__recipients']}>
				<HeadingFourth content="Recipients" />

				<ul className={f['form__recipients-list']}>
					{this.renderRecipients()}
				</ul>
			</div>
		);
	}
}

export default FormRecipients;
