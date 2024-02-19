import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import MultipleSelect from '@legion-lib/react-multiselect';
import LangHelper from '@srcRoot/helpers/langHelper';

export const OddsGroupFilter = (props) => {
    const formData = useSelector((state) => state.formData);

    const { onChange, isValid } = props;

    const _renderOddsGroupsSelectList = () => {
        const oddsGroupList = formData.oddsGroupList;
        return (
            oddsGroupList?.length && (
                <MultipleSelect
                    id="ddlOddGroup"
                    language={LangHelper.currentLanguage}
                    dataSource={oddsGroupList}
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
            <label className="label-text">{LangHelper.getSingleResource('OddsGroup')}</label>
            {_renderOddsGroupsSelectList()}
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

OddsGroupFilter.propTypes = propTypes;
OddsGroupFilter.defaultProps = defaultProps;

export default memo(OddsGroupFilter);
