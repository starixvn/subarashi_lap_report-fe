import React, { memo } from 'react';

import CollapsiblePanel from '@/components/CollapsiblePanel';
import LangHelper from '@/helpers/langHelper';
import SubmitButton from '@/components/SubmitButton.jsx';
import { WL_ANALYSIS } from '@/constants/pages.js';

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
                            <SubmitButton disabled={!isValidModel} onClick={submit} label={WL_ANALYSIS}>
                                {LangHelper.getSingleResource('Submit')}
                            </SubmitButton>
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
