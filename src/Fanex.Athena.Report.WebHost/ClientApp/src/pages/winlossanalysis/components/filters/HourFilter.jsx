import React from 'react'
import MultipleSelect from '@legion-lib/react-multiselect'
import LangHelper from '@srcRoot/helpers/langHelper'
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ALL_SELECTED_TEXT } from '../../common/constants';
import { useSelector } from 'react-redux';

export const HourFilter = (props) => {
    const {onChange, isValid} = props;
    const formData = useSelector((state) => state.formData);

    const _renderHourSelectList = () => {
        const hourList = formData.hourList;

        return hourList && hourList.length && (
            <MultipleSelect
                id="HourList"
                language={LangHelper.currentLanguage}
                dataSource={hourList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={onChange}
                isValid={isValid}
                allOptionValue={ALL_SELECTED_TEXT}/>);
    }

    return (
    <div className="form-group">
        <label className="label-text">{LangHelper.getSingleResource("Hour")}</label>
        {_renderHourSelectList()}
    </div>)
}

const propTypes = {
    onChange: PropTypes.func
};

HourFilter.propTypes = propTypes;

export default memo(HourFilter);