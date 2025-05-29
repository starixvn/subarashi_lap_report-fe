import React, { useRef, useCallback, useEffect } from 'react';
import { InputType } from '../../../lib/constants';

const InputCell = ({ value, fieldKey, onChange, type = InputType.text, width = '100%', min, max }) => {
    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const isValidValue = () => {
        if (!value) return false;
        if (type === InputType.text && value.trim() === '') return false;

        if (type === InputType.number && value !== '') {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) return false;
            if (min !== undefined && numValue < min) return false;
            if (max !== undefined && numValue > max) return false;
        }

        return true;
    };

    const inputStyle = {
        width: width,
        height: '24px',
        boxSizing: 'border-box',
        backgroundColor: isValidValue() ? 'white' : '#ffcccc',
    };

    const handleChange = useCallback(
        (e) => {
            let newValue = e.target.value;

            if (type === InputType.number) {
                if (newValue.includes('e') || newValue.includes('E')) {
                    newValue = newValue.replace(/[eE]/g, '');
                }

                if (min !== undefined && min >= 0 && newValue.includes('-')) {
                    newValue = newValue.replace(/-/g, '');
                }

                if (newValue !== '' && !isNaN(parseFloat(newValue))) {
                    const numValue = parseFloat(newValue);

                    if (!isNaN(numValue)) {
                        if (min !== undefined && numValue < min) {
                            newValue = min.toString();
                        }

                        if (max !== undefined && numValue > max) {
                            newValue = max.toString();
                        }
                    }
                }
            }

            if (newValue !== valueRef.current) {
                valueRef.current = newValue;
                if (fieldKey) {
                    onChange(fieldKey, newValue);
                } else {
                    onChange(newValue);
                }
            }
        },
        [onChange, fieldKey, type, min, max]
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (type === InputType.number) {
                if (min !== undefined && min >= 0 && e.key === '-') {
                    e.preventDefault();
                }

                if (e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                }
            }
        },
        [type, min]
    );

    const inputProps = {
        type,
        value: value || '',
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        style: inputStyle
    };

    if (type === InputType.number) {
        if (min !== undefined) inputProps.min = min;
        if (max !== undefined) inputProps.max = max;
    }

    return <input {...inputProps} />;
};

export default React.memo(InputCell);
