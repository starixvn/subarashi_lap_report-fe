import React from 'react';
import PropTypes from 'prop-types';

import GtagHelper from '@srcRoot/helpers/gtagHelper';

const SubmitButton = ({ onClick, disabled, children, className, label, ...rest }) => {
    const onClickSubmit = (e) => {
        GtagHelper.logViewReportData(label);

        onClick && onClick(e);
    };

    return (
        <button disabled={disabled} className={className} onClick={onClickSubmit} {...rest}>
            {children}
        </button>
    );
};

SubmitButton.propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
    className: 'btn btn-submit',
    disabled: false,
};

export default SubmitButton;
