import React from 'react';

const DropdownCell = ({ value, fieldKey, dataSource, onChange, width = '100%', item, propertyName }) => {
    const enhancedDataSource = [...(dataSource || [])];

    const actualValue = item && propertyName ? item[propertyName] : value;

    const selectStyle = {
        height: '24px',
        boxSizing: 'border-box',
        width: width,
        minWidth: '40px',
    };

    return enhancedDataSource?.length ? (
        <select id={fieldKey} className="cell-dropdown" style={selectStyle} onChange={(e) => onChange(fieldKey, e.target.value)} value={actualValue}>
            {enhancedDataSource.map((item) => (
                <option key={item.key} value={item.value} disabled={item.disabled}>
                    {item.value}
                </option>
            ))}
        </select>
    ) : null;
};

export default DropdownCell;
