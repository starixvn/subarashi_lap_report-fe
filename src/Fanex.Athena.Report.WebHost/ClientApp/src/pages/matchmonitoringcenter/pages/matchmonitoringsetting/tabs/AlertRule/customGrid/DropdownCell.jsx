import React, { useCallback } from 'react';

const DropdownCell = ({ value, fieldKey, dataSource, onChange, width = '100%', item, propertyName }) => {
    const enhancedDataSource = [...(dataSource || [])];

    const actualValue = item && propertyName ? item[propertyName] : value;

    const selectStyle = {
        height: '24px',
        boxSizing: 'border-box',
        width: width,
        minWidth: '40px',
        border: 'none',
        borderBottom: '1px solid #ccc',
        outline: 'none',
        padding: '2px 4px',
        transition: 'border-color 0.2s',
        backgroundColor: 'white',
    };

    const handleFocus = useCallback((e) => {
        e.target.style.borderBottomColor = '#2196F3';
    }, []);

    const handleBlur = useCallback((e) => {
        e.target.style.borderBottomColor = '#ccc';
    }, []);

    return enhancedDataSource?.length ? (
        <select
            id={fieldKey}
            className="cell-dropdown"
            style={selectStyle}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            value={actualValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {enhancedDataSource.map((item) => (
                <option key={item.key} value={item.value} disabled={item.disabled}>
                    {item.value}
                </option>
            ))}
        </select>
    ) : null;
};

export default DropdownCell;
