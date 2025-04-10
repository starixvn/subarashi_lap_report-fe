import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MultipleSelect from '@legion-lib/react-multiselect';

import LangHelper from '@/helpers/langHelper';

export const StatusFilter = (props) => {
    const formData = useSelector((state) => state.formData);

    const { onChange, isValid } = props;
    const _renderStatusSelectList = () => {
        const statusList = formData.statusList;

        return (
            statusList &&
            statusList.length && (
                <MultipleSelect
                    id="StatusList"
                    language={LangHelper.currentLanguage}
                    dataSource={statusList}
                    keyField={'id'}
                    valueField={'value'}
                    statusField={'status'}
                    onChange={onChange}
                    isValid={isValid}
                />
            )
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource('Status')}</label>
            {_renderStatusSelectList()}
        </div>
    );
};
const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
};
const defaultProps = {
    isValid: true,
};

StatusFilter.propTypes = propTypes;
StatusFilter.defaultProps = defaultProps;

export default memo(StatusFilter);
