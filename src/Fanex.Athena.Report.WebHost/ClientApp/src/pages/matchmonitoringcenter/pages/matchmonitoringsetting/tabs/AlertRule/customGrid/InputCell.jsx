import React, { useRef, useCallback, useEffect } from 'react';
import { InputType } from '../../../lib/constants';

const validateTextValue = value => value && value.trim() !== '';

const validateNumberValue = (value, min, max, SQL_MONEY_MAX) => {
    if (value === '') {
        return true;
    }

    const numValue = parseFloat(value);
    const isValidNumber = !isNaN(numValue);
    const isWithinMaxLimit = numValue <= SQL_MONEY_MAX;
    const isAboveMinLimit = min === undefined || numValue >= min;
    const isBelowMaxLimit = max === undefined || numValue <= max;

    return isValidNumber && isWithinMaxLimit && isAboveMinLimit && isBelowMaxLimit;
};

const processNumberInput = value => {
    let processed = value;

    if (processed.includes('e') || processed.includes('E')) {
        processed = processed.replace(/[eE]/g, '');
    }

    if (processed.includes('-')) {
        processed = processed.replace(/-/g, '');
    }

    return processed;
};

const clampNumberValue = (value, min, max, SQL_MONEY_MAX) => {
    if (value === '' || value === '.') {
        return value;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return value;
    }

    if (numValue > SQL_MONEY_MAX) {
        return SQL_MONEY_MAX.toString();
    }
    if (min !== undefined && numValue < min) {
        return min.toString();
    }
    if (max !== undefined && numValue > max) {
        return max.toString();
    }

    return value;
};

const InputCell = ({ value, fieldKey, onChange, type = InputType.text, width = '100%', min, max }) => {
    const valueRef = useRef(value);
    const SQL_MONEY_MAX = 922337203685477;
    const DEFAULT_MAX_TEXT_LENGTH = 50;

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const isValidValue = () => {
        if (!value) {
            return false;
        }

        if (type === InputType.text) {
            return validateTextValue(value);
        }

        if (type === InputType.number) {
            return validateNumberValue(value, min, max, SQL_MONEY_MAX);
        }

        return true;
    };

    const inputStyle = {
        width: width,
        height: '24px',
        boxSizing: 'border-box',
        backgroundColor: isValidValue() ? 'white' : '#ffcccc',
        border: 'none',
        borderBottom: '1px solid #ccc',
        outline: 'none',
        padding: '2px 4px',
        transition: 'border-color 0.2s',
    };

    const limitDecimalPlaces = (value, decimalPlaces = 2) => {
        if (!value || !value.includes('.')) {
            return value;
        }

        const parts = value.split('.');
        if (parts.length !== 2) {
            return value;
        }

        const decimalPart = parts[1].slice(0, decimalPlaces);
        return `${parts[0]}.${decimalPart}`;
    };

    const handleChange = useCallback(
        e => {
            let newValue = e.target.value;

            if (type === InputType.number) {
                newValue = processNumberInput(newValue);
                newValue = limitDecimalPlaces(newValue);
                newValue = clampNumberValue(newValue, min, max, SQL_MONEY_MAX);
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
        e => {
            if (type === InputType.number) {
                if (e.key === 'e' || e.key === 'E') {
                    e.preventDefault();
                }

                if (e.key === '-') {
                    e.preventDefault();
                }
            }
        },
        [type]
    );

    const handleFocus = useCallback(e => {
        e.target.style.borderBottomColor = '#2196F3';
    }, []);

    const handleBlur = useCallback(
        e => {
            e.target.style.borderBottomColor = '#ccc';

            if (type === InputType.number && e.target.value && e.target.value.includes('.')) {
                const formattedValue = limitDecimalPlaces(e.target.value);
                if (formattedValue !== e.target.value) {
                    e.target.value = formattedValue;
                    if (fieldKey) {
                        onChange(fieldKey, formattedValue);
                    } else {
                        onChange(formattedValue);
                    }
                }
            }
        },
        [type, fieldKey, onChange]
    );

    const inputProps = {
        type,
        value: value || '',
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        style: inputStyle,
    };

    if (type === InputType.number) {
        if (min !== undefined) {
            inputProps.min = min;
        }
        if (max !== undefined) {
            inputProps.max = max;
        }
    } else if (type === InputType.text) {
        inputProps.maxLength = max || DEFAULT_MAX_TEXT_LENGTH;
    }

    return <input {...inputProps} />;
};

export default React.memo(InputCell);
