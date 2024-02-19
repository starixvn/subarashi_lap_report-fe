import React, { memo } from 'react';

import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import LangHelper from '@srcRoot/helpers/langHelper';

import { useValidParam } from '../hooks/useValidParam.jsx';
import useFilterAction from '../hooks/useFilterAction.jsx';
import { GroupByOptionFilter } from '../filters/GroupByOptionsFilter.jsx';
import BreakDownOptionFilter from '../filters/BreakDownOptionFilter.jsx';

export const GroupByFilter = () => {
    const isValidModel = useValidParam();
    const { submit, onClickClearFilter } = useFilterAction();

    return (
        <CollapsiblePanel isCollapseMode={false}>
            <div className="row flex w100">
                <div className="">
                    <div className="flex flex-col">
                        <div className="col-md-12 ">
                            <GroupByOptionFilter />
                        </div>
                        <div className="col-md-12">
                            <BreakDownOptionFilter />
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel} className="btn btn-submit" onClick={submit}>
                                {LangHelper.getSingleResource('Submit')}
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClickClearFilter}>
                                {LangHelper.getSingleResource('ClearAllFilters')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default memo(GroupByFilter);
