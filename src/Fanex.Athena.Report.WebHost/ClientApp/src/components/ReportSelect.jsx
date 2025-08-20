import React from 'react';
import Select, { components } from 'react-select';

const ReportSelect = props => (
    <Select components={{ DropdownIndicator: CustomDropdownIndicator }} className="report-select-container" classNamePrefix="report-select" {...props}></Select>
);

export default ReportSelect;

const CustomDropdownIndicator = props => {
    const { selectProps } = props;
    const CaretDownIcon = () => (
        <div className="select-arrow-zone">
            <span className="select-arrow"></span>
        </div>
    );

    const CaretUpIcon = () => (
        <div className="select-arrow-zone">
            <span className="select-arrow expanded"></span>
        </div>
    );

    return <components.DropdownIndicator {...props}>{selectProps.menuIsOpen ? <CaretUpIcon /> : <CaretDownIcon />}</components.DropdownIndicator>;
};
