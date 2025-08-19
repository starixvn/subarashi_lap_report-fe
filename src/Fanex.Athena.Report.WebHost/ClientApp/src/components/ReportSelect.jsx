import React from 'react';
import Select, { components } from 'react-select';

export default function ReportSelect(props) {
    return (
        <Select
            components={{ DropdownIndicator: CustomDropdownIndicator }}
            className="report-select-container"
            classNamePrefix="report-select"
            {...props}></Select>
    );
}

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
