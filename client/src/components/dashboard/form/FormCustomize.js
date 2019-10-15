import React from 'react';

import DataContext from '../contexts/DataContext';

import { SvgX } from '../Svg';

import typo from '../css/typography.module.css';
import f from '../css/form-customize.module.css';
import { form__sender } from '../css/form.module.css';

class FormCustomize extends React.Component {
	state = {
		inputType: 'input',
		inputValue: ''
	};

	static contextType = DataContext;

	componentDidMount() {
		this.inputValueRef = React.createRef();
	}

	onAddEmailInput = async () => {
		this.context.setData({
			emailInputs: this.context.emailInputs.concat(this.state)
		});

		this.setState({ inputValue: '' });
		this.inputValueRef.current.focus();
	};

	onDeleteEmailInput(inputValue) {
		this.context.setData({
			emailInputs: this.context.emailInputs.filter(
				element => element.inputValue !== inputValue
			)
		});
	}

	renderEmailInputs() {
		return this.context.emailInputs.map(({ inputType, inputValue }) => {
			const nameCapitalized =
				inputType.charAt(0).toUpperCase() + inputType.slice(1);
			return (
				<li key={inputValue} className={f['form__customize-item']}>
					<span>{nameCapitalized} :</span>
					<span>{inputValue}</span>
					<button
						onClick={() => this.onDeleteEmailInput(inputValue)}
						type="button"
						className={typo['btn--action']}
					>
						<SvgX />
					</button>
				</li>
			);
		});
	}

	renderCustomize() {
		if (this.context.custom) {
			return (
				<div className={f['form__customize']}>
					<ul
						className={`${f['form__customize-list']} ${
							typo['mb-md']
						}`}
					>
						{this.renderEmailInputs()}
					</ul>

					<div className={f['form__customize-input']}>
						<select
							style={{ width: '11rem' }}
							className={`${form__sender} ${
								f['form__customize-select']
							}`}
							onChange={e =>
								this.setState({ inputType: e.target.value })
							}
						>
							<option value="input" defaultValue>
								Input
							</option>
							<option value="textarea">Textarea</option>
						</select>

						<input
							className={form__sender}
							type="text"
							placeholder="Description for the given input"
							ref={this.inputValueRef}
							onChange={e =>
								this.setState({ inputValue: e.target.value })
							}
							value={this.state.inputValue}
						/>
						<button
							className={`${typo['btn']} ${typo['btn--small']}`}
							onClick={this.onAddEmailInput}
							type="button"
						>
							Add
						</button>
					</div>
				</div>
			);
		}

		return (
			<p className={`${f['form__note']} ${typo['mb-md']}`}>
				<span>Note:</span>Disabling the customize option will cause the
				surveys to be sent in a simple "yes" or "no" fashion emails. We
				strongly suggest leaving this option enabled, as it will give
				you more effective and targeted insight.
			</p>
		);
	}

	render() {
		return <>{this.renderCustomize()}</>;
	}
}

export default FormCustomize;
