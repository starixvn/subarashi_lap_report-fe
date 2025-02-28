import React, { memo, useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../../actions/index.js';
import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';
import { DefaultPagingOption, MobileGroupByHeaderDisplayType, SortOrder, HeaderText, SortBy } from '../../common/constants.js';

import { RefPager } from '@/components/mobile-component/RefPager';
import { useElementSize, useWindowSize } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { Table, Cell, Row, HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import { DrowdownRadioList } from '@/components/dropdown';
import MobileGroupByRowList from './MobileGroupByRowList';
import NumberFormat from '@/lib/numberFormat';
import LangHelper from '@/helpers/langHelper';
import useRenderRowOption from '../hooks/useRenderRowOption.jsx';
import ReportTitleContent from './ReportTitleContent.jsx';

const VerySmallColumnWidths = [32, 32, 32, 13];
const SmallColumnWidths = [125, 105, 110, 26];
const LargeColumnWidths = ['31%', '31%', '31%', '7%'];

export const MobileDataGrid = () => {
    const [requestParam, reportData, reloadReport] = useSelector(
        (state) => [state.requestParam, state.reportData, state.reportTitle, state.reloadReport, state.selectedProduct],
        shallowEqual,
    );
    const ref = useRef(null);
    const [pagerRef, pagerSize] = useElementSize();
    const [id, setId] = useState(`${uuidv4()}`);
    const [headerDisplayType, setHeaderDisplayType] = useState(MobileGroupByHeaderDisplayType.ExternalId);
    const { setRequestParam, toggleLoader, getReportData } = ActionCreators;
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const { data, sumTotal, totalRow } = reportData;

    useEffect(() => {
        dispatch(toggleLoader(false));
        setId(`${uuidv4()}`);
    }, [reportData]);

    useEffect(() => {
        const style = `bottom: ${pagerSize.height - 1}px`;
        ref.current?.getElementsByClassName('footer-content')[0]?.setAttribute('style', style);
    }, [pagerSize?.height, id]);

    useEffect(() => {
        ref.current?.scrollIntoView();
    }, [id]);

    const { isBreakDownPlayerMode, isGroupByPlayerMode } = useRenderRowOption();
    const isDisplayHeaderDropdownOption = isBreakDownPlayerMode || isGroupByPlayerMode;

    const dataSource = useMemo(
        () => [
            { id: MobileGroupByHeaderDisplayType.ExternalId, text: HeaderText.ExternalId },
            { id: MobileGroupByHeaderDisplayType.SystemId, text: HeaderText.SystemId },
        ],
        [],
    );

    const onChangeIdDisplayType = useCallback(
        (event) => {
            const { value } = event.target;
            setHeaderDisplayType(value);
        },
        [setHeaderDisplayType],
    );

    const collumnWidths = width > 500 ? LargeColumnWidths : width > 370 ? SmallColumnWidths : VerySmallColumnWidths;

    const _renderHeader = () => {
        const className = isDisplayHeaderDropdownOption ? 'cell-dropdown' : '';
        return (
            <HeaderRow key={id}>
                <HeaderCell colWidth={collumnWidths[0]} className={className}>
                    <div className="w100 cell-header-groupby">
                        <span>{HeaderText.GroupBy}</span>
                        {isDisplayHeaderDropdownOption && (
                            <DrowdownRadioList
                                id="dropdown-header"
                                key="dropdown-header"
                                className="search-option"
                                dataSource={dataSource}
                                selectedValue={headerDisplayType}
                                onChange={onChangeIdDisplayType}
                                keySelector="id"
                                valueSelector="text"
                            />
                        )}
                    </div>
                </HeaderCell>
                <HeaderCell colWidth={collumnWidths[1]} sortBy={SortBy.Turnover}>
                    {HeaderText.TurnOver}
                </HeaderCell>
                <HeaderCell colWidth={collumnWidths[2]} sortBy={SortBy.MemWinloss}>
                    {HeaderText.PlayerWL}
                </HeaderCell>
                <HeaderCell colWidth={collumnWidths[3]}></HeaderCell>
            </HeaderRow>
        );
    };

    const _renderFooter = () => {
        if (!sumTotal) {
            return;
        }
        const { turnover, playerWinloss } = sumTotal;
        return (
            <Row className="fixed-table-grant-total">
                <Cell colSpan="2">
                    <div className="cell-total">
                        <div className="total-text flex-initial">{LangHelper.getSingleResource('Total')}</div>
                        <div className="flex-auto right-align">{NumberFormat.formatDecimal(turnover)}</div>
                    </div>
                </Cell>
                <Cell className="right-align cell-total-winloss border-r-0">{NumberFormat.formatDecimal(playerWinloss)}</Cell>
                <Cell className="border-l-0"></Cell>
            </Row>
        );
    };

    const header = useMemo(() => _renderHeader(), [isDisplayHeaderDropdownOption, headerDisplayType, onChangeIdDisplayType, id]);
    const body = useMemo(() => <MobileGroupByRowList key={id} dataList={data} selectedDisplayTypeId={headerDisplayType} />, [data, headerDisplayType, id]);
    const footer = useMemo(() => _renderFooter(), [sumTotal]);

    const currenPagingOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: totalRow,
        PageList: DefaultPagingOption.PageList,
    };

    const submitRequest = (params) => {
        dispatch(setRequestParam(params));
        dispatch(toggleLoader(true));
        dispatch(getReportData(params));
    };

    const onSort = (sortBy, sortOrder) => {
        const requestSortOrder = sortOrder == 'asc' ? SortOrder.ASC : SortOrder.DESC;
        const params = { ...requestParam, SortBy: sortBy, SortOrder: requestSortOrder };
        submitRequest(params);
    };

    const onPaging = (pageIndex, pageSize) => {
        const params = { ...requestParam, PageSize: pageSize, PageIndex: pageIndex };
        submitRequest(params);
    };

    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }
    const isShowPagingInfo = pagerSize.width > 400;
    return (
        <div className="mobile-table result-content" ref={ref}>
            <ReportTitle content={<ReportTitleContent />} tag="div" />
            <Table
                key={`table-winloss-analysis-${requestParam.SubmitTime}`}
                autoWidth={true}
                autoHeight={false}
                header={header}
                body={body}
                footer={footer}
                isPaging={false}
                pageOption={currenPagingOption}
                shouldResetScrollPosition={reloadReport}
                bodyHeight="100%"
                containerPadding={2}
                isIncludeScrollWidth={false}
                onSort={onSort}
            />
            <RefPager ref={pagerRef} onPaging={onPaging} pageOption={currenPagingOption} isShowPagingInfo={isShowPagingInfo} />
        </div>
    );
};

export default memo(MobileDataGrid);
