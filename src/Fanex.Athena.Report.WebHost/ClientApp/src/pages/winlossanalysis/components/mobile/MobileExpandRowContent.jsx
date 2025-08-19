import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@legion-lib/react-grid';

export const MobileExpandRowContent = props => {
    const { text, value, className, valueClass } = props;
    return (
        <Cell className={className} colSpan={4}>
            <div className="flex detail-content">
                <div className="text w100">{text}</div>
                <div className={`w100 right-align ${valueClass}`}>{value}</div>
            </div>
        </Cell>
    );
};

const propTypes = {
    text: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    valueClass: PropTypes.string,
};
const defaultProps = {
    className: '',
    valueClass: '',
};
MobileExpandRowContent.propTypes = propTypes;
MobileExpandRowContent.defaultProps = defaultProps;

export default memo(MobileExpandRowContent);
