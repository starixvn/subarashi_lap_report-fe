import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MultipleSelect from '@legion-lib/react-multiselect';
import LangHelper from '@srcRoot/helpers/langHelper';

export const LiveStatusFilter = (props) => {
    const formData = useSelector((state) => state.formData);
    const { onChange, isValid } = props;

    const _renderLiveStatusSelectList = () => {
        const liveStatusList = formData.liveStatusList;

        return (
            liveStatusList &&
            liveStatusList.length && (
                <MultipleSelect
                    id="LiveStatusList"
                    language={LangHelper.currentLanguage}
                    dataSource={liveStatusList}
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
            <label className="label-text">{LangHelper.getSingleResource('LiveStatus')}</label>
            {_renderLiveStatusSelectList()}
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

LiveStatusFilter.propTypes = propTypes;
LiveStatusFilter.defaultProps = defaultProps;

export default memo(LiveStatusFilter);
