import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Cell, HeaderRow } from '@legion-lib/react-grid';

import LangHelper from '@/helpers/langHelper';
import { MAX_WIDTH_PAGE, MIN_WIDTH_PAGE } from '@/constants/config';
import NoDataTitle from '@/components/NoDataTitle';
import NumberFormat from '@/lib/numberFormat';

import { ActionCreators } from '../actions';
import Constants from '../constants';
import HeaderCell from '../customGrid/HeaderCell';

const DataGrid = (props) => {
    const dispatch = useDispatch();
    const requestParam = useSelector((state) => state.requestParam);
    const gridData = useSelector((state) => state.gridData);

    const { setRequestParam, setGridData } = ActionCreators;
    const { GridSettings } = Constants;

    if (!gridData) {
        return null;
    }

    if (!gridData.data.length) {
        return <NoDataTitle />;
    }

    const _buildHeader = (headers) => {
        const headerCells = [
            <HeaderCell colWidth={40} key="header-index">
                #
            </HeaderCell>,
            <HeaderCell colWidth={180} key="header-sport" sortBy={GridSettings.SPORT_NAME}>
                {LangHelper.getSingleResource('Sport')}
            </HeaderCell>,
            ...headers.map((header, index) => (
                <HeaderCell colWidth={90} key={`header-${header}`} sortBy={`${GridSettings.PREFIX_WEEK}${index}`}>
                    {header}
                </HeaderCell>
            )),
        ];
        return [
            <HeaderRow style={{ height: 23 }} key="header">
                {headerCells}
            </HeaderRow>,
        ];
    };

    const _buildBody = (data) => {
        return data.map((item, indexCell) => {
            return (
                <Row key={`row-${item.cell[GridSettings.COL_INDEX]}`}>
                    <Cell className={'center-align'} key={`col-${GridSettings.COL_INDEX}`}>
                        {indexCell + 1}
                    </Cell>
                    <Cell className={'left-align'} key={`col-${GridSettings.COL_SPORT_NAME}`}>
                        {item.cell[GridSettings.COL_SPORT_NAME]}
                    </Cell>
                    {item.cell.slice(GridSettings.COL_START_WEEK).map((cell, index) => (
                        <Cell className={'right-align'} key={`col-${index}`}>
                            {NumberFormat.formatInteger(cell)}
                        </Cell>
                    ))}
                </Row>
            );
        });
    };

    const _buildFooter = (totalData) => {
        return (
            <Row key={'footer'}>
                <Cell className="center-align" colSpan={2}>
                    {LangHelper.getSingleResource('Total')}
                </Cell>
                {totalData.map((total, index) => (
                    <Cell className="right-align" key={`footer-${index}`}>
                        {NumberFormat.formatInteger(total)}
                    </Cell>
                ))}
            </Row>
        );
    };

    const objectComparator = (objA, objB, sortOrderBy, getValue = (obj) => obj) => {
        if (getValue(objA) == getValue(objB)) {
            return 0;
        }

        if (sortOrderBy == 'asc') {
            return getValue(objA) > getValue(objB) ? 1 : -1;
        }

        return getValue(objA) < getValue(objB) ? 1 : -1;
    };

    const _onSort = (sortBy, sortOrderBy) => {
        let columnIndex = GridSettings.COL_SPORT_NAME;
        if (sortBy.includes(GridSettings.PREFIX_WEEK)) {
            columnIndex = Number(sortBy.replace(GridSettings.PREFIX_WEEK, '')) + GridSettings.COL_START_WEEK;
        }

        const getValue = (match) => match.cell[columnIndex];
        gridData.data.sort((matchA, matchB) => objectComparator(matchA, matchB, sortOrderBy, getValue));

        dispatch(setGridData(gridData));
        dispatch(setRequestParam({ ...requestParam, SortColumn: sortBy, SortDirection: sortOrderBy }));
    };

    return (
        <React.Fragment>
            <Table
                minWidth={MIN_WIDTH_PAGE}
                autoWidth={true}
                maxWidth={MAX_WIDTH_PAGE}
                autoHeight={true}
                header={_buildHeader(gridData.weekHeaders)}
                body={_buildBody(gridData.data)}
                footer={_buildFooter(gridData.weeksTotalData)}
                containerPadding={30}
                onSort={_onSort}
                shouldResetScrollPosition={true}
            />
        </React.Fragment>
    );
};

export default React.memo(DataGrid);
