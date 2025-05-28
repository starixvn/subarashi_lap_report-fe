import React, { useRef, useCallback, useEffect } from 'react';
import { InputType } from '../../../lib/constants';

const InputCell = ({ value, fieldKey, onChange, type = InputType.text, width = '100%' }) => {
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const inputStyle = {
        width: width,
        height: '24px',
        boxSizing: 'border-box',
        backgroundColor: value ? 'white' : '#ffcccc',
    };

    const handleChange = useCallback(
        (e) => {
            const newValue = e.target.value;
            if (newValue !== valueRef.current) {
                valueRef.current = newValue;
                if (fieldKey) {
                    onChange(fieldKey, newValue);
                } else {
                    onChange(newValue);
                }
            }
        },
        [onChange, fieldKey]
    );

    return <input type={type} value={value || ''} onChange={handleChange} style={inputStyle} />;
};

export default React.memo(InputCell);
