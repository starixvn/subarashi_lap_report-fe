import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const DropdownRadioItem = (props) => {
    const { checked, text, value, onChange, id } = props;

    const _onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.value = event.target.value = value;
        onChange(event);
    };

    return (
        <label className="selection-item" onClick={_onClick}>
            <input id={id} name={id} type="radio" value={value} readOnly={true} checked={checked} />
            <label htmlFor={id} dangerouslySetInnerHTML={{ __html: text }}></label>
        </label>
    );
};

const propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
};

DropdownRadioItem.propTypes = propTypes;

export default memo(DropdownRadioItem);
