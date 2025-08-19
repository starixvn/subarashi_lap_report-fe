import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Item from './Radio';

const RadioGroup = props => {
    const [value, setValue] = useState(props.value);

    const onChange = selectedValue => {
        if (value === selectedValue) {
            return;
        }

        setValue(selectedValue);

        if (props.onChange) {
            props.onChange(selectedValue);
        }
    };

    const renderItem = () => {
        const { options, name } = props;
        return options.map(item => {
            const isChecked = item.value === value;
            const id = `${name}-${item.value}`;

            return (
                <Item
                    key={id}
                    value={item.value}
                    checked={isChecked}
                    name={name}
                    id={id}
                    label={item.label}
                    onChange={selectedValue => onChange(selectedValue)}
                />
            );
        });
    };

    return (
        <div className={`radio-group ${props.className}`}>
            <label className="label-text">{props.label}</label>
            {renderItem()}
        </div>
    );
};

RadioGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
    ).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

RadioGroup.defaultProps = {
    label: '',
    name: '',
    value: 0,
    onChange: () => {},
};

export default RadioGroup;
