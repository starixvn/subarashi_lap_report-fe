import React from 'react';
import PropTypes from 'prop-types';

import GtagHelper from '@/helpers/gtagHelper';

const SubmitButton = ({ id, onClick, disabled, children, className, label, ...rest }) => {
    const onClickSubmit = e => {
        GtagHelper.logViewReportData(label);

        onClick && onClick(e);
    };

    return (
        <button id={id} disabled={disabled} className={className} onClick={onClickSubmit} {...rest}>
            {children}
        </button>
    );
};

SubmitButton.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

SubmitButton.defaultProps = {
    className: 'btn btn-submit',
    disabled: false,
    id: 'SubmitButton',
};

export default SubmitButton;
