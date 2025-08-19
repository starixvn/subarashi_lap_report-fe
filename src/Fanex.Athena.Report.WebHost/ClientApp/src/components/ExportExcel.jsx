import React from 'react';
import LangHelper from '@/helpers/langHelper';
import PropTypes from 'prop-types';

const ExportExcel = props => {
    const _onClickHandler = event => {
        event.preventDefault();
        if (!props.disabled) {
            props.onClick && props.onClick();
        }
    };

    return <i id="ExportToExcel" className={props.className} onClick={_onClickHandler} title={LangHelper.getSingleResource('ExportToExcel')} />;
};

ExportExcel.propTypes = {
    className: PropTypes.string,
};

ExportExcel.defaultProps = {
    className: 'icon-excel right',
};

export default ExportExcel;
