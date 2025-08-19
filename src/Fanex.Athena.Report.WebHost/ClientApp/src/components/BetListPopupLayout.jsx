import React from 'react';
import PropTypes from 'prop-types';

const BetListPopupLayout = ({ title, className, children }) => (
    <div className="popup-content-default">
        <div className="caption">{title}</div>
        <div className={className}>{children}</div>
    </div>
);

BetListPopupLayout.propTypes = {
    title: PropTypes.any,
};

export default BetListPopupLayout;
