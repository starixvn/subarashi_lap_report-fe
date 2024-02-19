import React, { useState, memo } from 'react';
import DropdownButton from './DropdownButton';
import DropdownItem from './DropdownItem';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import DropdownRadioItem from './DropdownRadioItem';

export const DrowdownRadioList = (props) => {
    const { valueSelector, onChange, dataSource, keySelector, selectedValue, iconClass, className, id } = props;
    const [isOpen, setIsOpen] = useState(false);
    const _handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const _handleClose = () => {
        setIsOpen(false);
    };

    const toggleButton = {
        className: 'toggle-outline toggle-outline-light',
    };

    return (
        <DropdownButton
            className={className}
            isOpen={isOpen}
            toggleButton={toggleButton}
            onToggle={_handleToggleDropdown}
            buttonLabel={<i className={iconClass}>settings</i>}
            onClose={_handleClose}>
            {dataSource.length > 0 &&
                dataSource.map((item) => {
                    const value = typeof keySelector == 'function' ? item[Object.keys(item).find(keySelector)] : item[keySelector];
                    const text = typeof valueSelector == 'function' ? item[Object.keys(item).find(valueSelector)] : item[valueSelector];
                    return (
                        <DropdownItem key={`${id}-${value}`} tag="div">
                            <DropdownRadioItem id={`${id}-${value}`} checked={selectedValue == value} value={value} text={text} onChange={onChange} />
                        </DropdownItem>
                    );
                })}
        </DropdownButton>
    );
};

const propTypes = {
    dataSource: PropTypes.array,
    keySelector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    valueSelector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    selectedValue: PropTypes.any,
    iconClass: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
};

const defaultProps = {
    dataSource: [],
    keySelector: 'id',
    valueSelector: 'value',
    iconClass: 'material-icons',
    className: '',
    id: uuidv4(),
};

DrowdownRadioList.propTypes = propTypes;
DrowdownRadioList.defaultProps = defaultProps;

export default memo(DrowdownRadioList);
