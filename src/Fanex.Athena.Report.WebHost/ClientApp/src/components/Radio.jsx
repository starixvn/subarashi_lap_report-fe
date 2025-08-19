import React from 'react';
import PropTypes from 'prop-types';

const Radio = (props) => {
    const handleChange = () => {
        if (props.onChange) {
            props.onChange(props.value);
        }
    };

    return (
        <span>
            <input type="radio" value={props.value} checked={props.checked} name={props.name} id={props.id} onChange={handleChange} />
            <label htmlFor={props.id}>{props.label}</label>
        </span>
    );
};

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

Radio.defaultProps = {
    label: '',
    name: '',
    value: 0,
    checked: false,
};

export default Radio;
