import React, { memo } from 'react';

import CollapsiblePanel from '@/components/CollapsiblePanel';
import LangHelper from '@/helpers/langHelper';
import SubmitButton from '@/components/SubmitButton';
import { WL_ANALYSIS } from '@/constants/pages';

import { useValidParam } from '../hooks/useValidParam';
import useFilterAction from '../hooks/useFilterAction';
import { GroupByOptionFilter } from '../filters/GroupByOptionsFilter.jsx';
import BreakDownOptionFilter from '../filters/BreakDownOptionFilter.jsx';
import PropTypes from 'prop-types';
import StickyIcon from '../filters/StickyIcon.jsx';

export const MobileGroupByFilter = props => {
    const { isCollapsed } = props;
    const isValidModel = useValidParam();
    const { submit, onClickClearFilter } = useFilterAction();
    const collapsedStyle = isCollapsed ? { display: 'none' } : {};
    return (
        <CollapsiblePanel isCollapseMode={false}>
            <div className="row flex w100">
                <div className="w100" style={collapsedStyle}>
                    <div className="flex flex-col">
                        <div className="col-12 ">
                            <GroupByOptionFilter />
                        </div>
                        <div className="col-12">
                            <BreakDownOptionFilter />
                        </div>
                    </div>
                </div>
                <div className="flex flex-center w100 flex-wrap">
                    <div className="form-group flex-auto">
                        <div className="button-group">
                            <SubmitButton disabled={!isValidModel} onClick={submit} label={WL_ANALYSIS}>
                                {LangHelper.getSingleResource('Submit')}
                            </SubmitButton>
                            <button type="button" className="btn btn-outline-secondary" onClick={onClickClearFilter}>
                                {LangHelper.getSingleResource('ClearAllFilters')}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-initial">
                        <StickyIcon />
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

const propTypes = {
    isCollapsed: PropTypes.bool,
};
const defaultProps = {
    isCollapsed: true,
};

MobileGroupByFilter.propTypes = propTypes;
MobileGroupByFilter.defaultProps = defaultProps;

export default memo(MobileGroupByFilter);
