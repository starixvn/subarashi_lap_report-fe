import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';
import { TreeViewOption } from '@/constants/report';
import { TreeViewSelect } from '@legion-lib/react-multiselect';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';

const SubsidiaryDropDownFilter = (props) => {
    const formData = useSelector((state) => state.formData);
    const {onChange, isValid} = props
    const { isWhiteLabelView } = useSubsidiarySearch();
    const _renderSubsidiaryTreeView = () => {
        return (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SubsidiaryTreeView"
                dataSource={formData.whitelabelList}
                keyField="value"
                valueField="name"
                statusField="checked"
                isAllTextShown={false}
                hasSearchBox={false}
                treeViewOption={TreeViewOption}
                onChange={onChange}
                isValid={isValid}
            />
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{isWhiteLabelView ? LangHelper.getSingleResource('WhiteLabel') : LangHelper.getSingleResource('Subsidiary')}</label>
            {_renderSubsidiaryTreeView()}
        </div>
    );
};

const propTypes = {
    onChange: PropTypes.func,
};

SubsidiaryDropDownFilter.propTypes = propTypes;

export default memo(SubsidiaryDropDownFilter);
