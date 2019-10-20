import React from 'react';
import Logo from '../../../assets/logo.png';
import facebook from '../assets/facebook-icon.png';
import twitter from '../assets/twitter-icon.png';
import instagram from '../assets/instagram-icon.png';

import t from '../css/template.module.css';

class Template extends React.Component {
	state = {
		color: '#2E86DE'
	};

	componentDidMount() {
		if (!this.props.survey.template) return;
		const COLORS = {
			blue: '#2E86DE',
			green: '#27AE60',
			red: '#E74C3C'
		};
		this.setState({ color: COLORS[this.props.survey.template] });
	}

	renderLinks = () => {
		if (this.props.survey.custom)
			return (
				<p
					style={{ backgroundColor: this.state.color }}
					className={t['template__link']}
				>
					Complete Survey
				</p>
			);

		return (
			<>
				<p
					style={{ backgroundColor: this.state.color }}
					className={t['template__link']}
				>
					Yes
				</p>
				<p
					style={{ backgroundColor: this.state.color }}
					className={t['template__link']}
				>
					No
				</p>
			</>
		);
	};

	render() {
		const { title, body } = this.props.survey;
		return (
			<div className={t['template']}>
				<img src={Logo} className={t['template__logo']} alt="Logo" />

				<div className={t['template__content']}>
					<h1
						style={{ backgroundColor: this.state.color }}
						className={t['template__title']}
					>
						{title}
					</h1>
					<div className={t['template__main']}>
						<p className={t['template__body']}>{body}</p>
						<div className={t['template__links']}>
							{this.renderLinks()}
						</div>
					</div>
				</div>

				<div className="template__footer">
					<img
						src={facebook}
						alt="Facebook"
						className={t['template__social']}
					/>
					<img
						src={twitter}
						alt="Twitter"
						className={t['template__social']}
					/>
					<img
						src={instagram}
						alt="Instagram"
						className={t['template__social']}
					/>
				</div>
			</div>
		);
	}
}

export default Template;
