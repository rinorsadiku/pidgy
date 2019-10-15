import React from 'react';

import DataContext from '../contexts/DataContext';
import validateEmail from '../../../utils/validateEmail';

import { SvgPlus } from './../Svg';

import f from '../css/form.module.css';
import typo from '../css/typography.module.css';

class FormRecipientInput extends React.Component {
	state = {
		errorMessage: '',
		recipient: ''
	};

	static contextType = DataContext;

	componentWillMount() {
		this.recipientsRef = React.createRef();
	}

	onRecipientsClick = () => {
		const { recipient } = this.state;

		// Add some validation here
		const valid = validateEmail(recipient);

		if (valid) {
			// Reference the context and call a function within the state to update the state
			this.context.setData({
				recipients: this.context.recipients.concat(recipient)
			});

			this.recipientsRef.current.focus();
			this.setState({ recipient: '', errorMessage: '' });
			return;
		}

		this.setState({ errorMessage: 'Please provide a correct email' });
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.onRecipientsClick();
		}
	};

	render() {
		return (
			<div className={f['form__input-group']}>
				<label className={f['form__label']}>Recipients</label>
				<div className={f['form__add']}>
					<input
						type="email"
						placeholder="Recipients"
						className={`${f['form__input']} ${
							this.state.errorMessage !== ''
								? f['form__error']
								: ''
						}`}
						value={this.state.recipient}
						onChange={e =>
							this.setState({ recipient: e.target.value })
						}
						onKeyPress={this.handleKeyPress}
						ref={this.recipientsRef}
					/>
					<button
						type="button"
						className={`${typo['btn--action']} ${
							f['form__input--button']
						}`}
						onClick={this.onRecipientsClick}
					>
						<SvgPlus />
					</button>
				</div>
				<p>{this.state.errorMessage}</p>
			</div>
		);
	}
}

export default FormRecipientInput;
