const keys = require('../config/keys');

module.exports = ({ id, custom }, color) => {
	if (!custom) {
		return `
            <a
                href="${keys.redirectDomain}/api/surveys/${id}/yes"
                style="margin-right: 15px;background-color: ${color};display: inline-block;color: #fff;padding: 9px 33px;border-radius: 5px;text-decoration: none;font-size: 17px;"
            >
                Yes
            </a>
            <a
                href="${keys.redirectDomain}/api/surveys/${id}/no"
                style="background-color: #999999;display: inline-block;color: #fff;padding: 9px 33px;border-radius: 5px;text-decoration: none;font-size: 17px;"
            >
                No
            </a>
        `;
	}

	return `
        <a
            href="${keys.redirectDomain}surveys/${id}/-email-"
            style="background-color: ${color};display: inline-block;color: #fff;padding: 8px 22px;border-radius: 5px;text-decoration: none;font-size: 17px;"
        >
            Complete Survey
        </a>
    `;
};
