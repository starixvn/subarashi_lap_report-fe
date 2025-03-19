import React from 'react';
import { TreeViewSelect } from '@legion-lib/react-multiselect';

import { TreeViewOption } from '@/constants/report';
import useSubsidiarySearch from '@/hooks/useSubsidiarySearch';
import LangHelper from '@/helpers/langHelper';

function SubsidiaryDropDown(props) {
    const { isWhiteLabelView } = useSubsidiarySearch();

    return (
        <div className="form-group">
            <label className="label-text">{isWhiteLabelView ? LangHelper.getSingleResource('WhiteLabel') : LangHelper.getSingleResource('Subsidiary')}</label>
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SubsidiaryTreeView"
                dataSource={props.dataSource}
                keyField="value"
                valueField="name"
                statusField="checked"
                isAllTextShown={false}
                hasSearchBox={false}
                treeViewOption={TreeViewOption}
                onChange={props.onChange}
            />
        </div>
    );
}

export default React.memo(SubsidiaryDropDown);
