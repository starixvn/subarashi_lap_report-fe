import React, { useEffect } from 'react';
import { Table, HeaderCell, HeaderRow, Row, Cell } from '@legion-lib/react-grid';
import PropTypes from 'prop-types';

const ALIGNMENT_CLASSES = {
    CENTER: 'center-align',
    RIGHT: 'right-align',
    LEFT: '',
};

const BetListTable = props => {
    useEffect(() => {
        props.afterLoad && props.afterLoad();
    }, [props.data]);

    const sortOrderMapper = {
        asc: 1,
        desc: 2,
    };

    const sortTypeMapper = {
        transdate: 0,
        stake: 1,
        winloss: 2,
        licenseewl: 3,
        betplaced: 4,
    };

    const getResource = key => (props.getResourceFunc ? props.getResourceFunc(key) : key);

    const getTotalCellClassName = (column, value) => {
        if (props.getTotalCellClassNameFunc) {
            return props.getTotalCellClassNameFunc(column, value);
        }
        return column === 'LicenseeWL' && value && value.startsWith('-') ? 'negative' : '';
    };

    const getHeaderName = column => (props.getHeaderNameFunc ? props.getHeaderNameFunc(column) : column);

    const mapData = data => (props.mappingDataFunc ? props.mappingDataFunc(data) : data);

    const buildHeader = () => {
        const rows = [];
        const timestamp = new Date().getTime();
        const { columns, columnWidths, sortableColumns, customHeaderCell } = props;

        const CustomHeaderCell = customHeaderCell ?? HeaderCell;

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const isSortable = sortableColumns.indexOf(column) >= 0;
            const headerName = getHeaderName(column);

            rows.push(
                <CustomHeaderCell key={column + timestamp} colWidth={columnWidths[i]} sortBy={isSortable ? column : null}>
                    {headerName}
                </CustomHeaderCell>
            );
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    };

    const buildBody = () => {
        const { columns, columnAlignments, data } = props;
        const rows = [];
        const timestamp = new Date().getTime();

        for (let i = 0; i < data.length; i++) {
            const item = mapData(data[i]);
            const cells = [];

            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                const hasTooltip = columnAlignments[j].indexOf('tooltip') !== -1;

                cells.push(
                    <Cell
                        key={`${column}-${i}-${timestamp}`}
                        className={columnAlignments[j]}
                        {...(hasTooltip ? { title: item[column] } : {})}
                        dangerouslySetInnerHTML={{ __html: item[column] }}></Cell>
                );
            }

            rows.push(<Row key={`${i}-${timestamp}`}>{cells}</Row>);
        }

        return rows;
    };

    const buildFooter = () => {
        if (!props.totalColumns || !props.totalColumns.length) {
            return null;
        }

        const timestamp = new Date().getTime();

        const { columns, totalColumns, total, totalText, columnAlignments, customFooterRow } = props;
        const startTotalIndex = columns.indexOf(totalColumns[0]);
        const rows = [];
        const cells = [];

        cells.push(
            <Cell key="total" className={ALIGNMENT_CLASSES.RIGHT} colSpan={startTotalIndex}>
                {totalText}
            </Cell>
        );

        const item = mapData(total);

        for (let i = 0; i < totalColumns.length; i++) {
            const column = totalColumns[i];
            const columnIndex = columns.indexOf(column);
            const className = getTotalCellClassName(column, item[column]);

            cells.push(
                <Cell
                    key={`Sum-${column}-${timestamp}`}
                    className={`${columnAlignments[columnIndex]} ${className}`}
                    dangerouslySetInnerHTML={{ __html: item[column] }}></Cell>
            );
        }

        const blankRows = columns.length - totalColumns.length - startTotalIndex;
        if (blankRows) {
            cells.push(<Cell key={`blank-${timestamp}`} colSpan={blankRows}></Cell>);
        }

        const CustomFooterRow = customFooterRow ?? Row;

        rows.push(
            <CustomFooterRow className="fixed-table-grant-total" key={`totalRow-${timestamp}`}>
                {cells}
            </CustomFooterRow>
        );

        return rows;
    };

    const renderNodata = () => (
        <div className="result-content">
            <p className={`no-info-row ${ALIGNMENT_CLASSES.CENTER}`}>{getResource('NoInfo')}</p>
        </div>
    );

    const onSort = (sortType, sortOrder) => {
        const newSortOrder = sortOrderMapper[sortOrder.toLowerCase()] ?? sortOrderMapper.asc;
        const newSortType = sortTypeMapper[sortType.toLowerCase()] ?? sortTypeMapper.transdate;

        props.onSort && props.onSort(newSortType, newSortOrder);
    };

    const onPaging = (index, size) => {
        props.onPaging && props.onPaging(index, size);
    };

    if (!props.data) {
        return null;
    }
    const getNoDataCondition = () => {
        if (props.noDataCondition) {
            return props.noDataCondition();
        }

        // default empty data condition
        return !props.data.length;
    };

    if (getNoDataCondition()) {
        return renderNodata();
    }

    const { isPaging, pageOption, adjustedHeight } = props;

    return (
        <div key="BetListDataGrid" className="betlist-container result-content">
            <Table
                onSort={onSort}
                minWidth={980}
                autoWidth={true}
                bodyHeight={300}
                header={buildHeader()}
                body={buildBody()}
                footer={buildFooter()}
                isPaging={isPaging}
                pageOption={pageOption}
                onPaging={onPaging}
                adjustedHeight={adjustedHeight}
            />
        </div>
    );
};

BetListTable.propTypes = {
    isPaging: PropTypes.bool,
    pageOption: PropTypes.shape({
        PageIndex: PropTypes.number,
        PageSize: PropTypes.number,
        TotalItem: PropTypes.number,
        PageList: PropTypes.arrayOf(PropTypes.number),
    }),
    columns: PropTypes.arrayOf(PropTypes.string),
    columnWidths: PropTypes.arrayOf(PropTypes.number),
    mappingDataFunc: PropTypes.func,
    sortableColumns: PropTypes.arrayOf(PropTypes.string),
    totalColumns: PropTypes.arrayOf(PropTypes.string),
    getHeaderNameFunc: PropTypes.func,
    columnAlignments: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    total: PropTypes.object,
    getTotalCellClassNameFunc: PropTypes.func,
    totalText: PropTypes.string,
    onSort: PropTypes.func,
    onPaging: PropTypes.func,
    afterLoad: PropTypes.func,
    adjustedHeight: PropTypes.number,
    getResourceFunc: PropTypes.func,
    customHeaderCell: PropTypes.object,
    customFooterRow: PropTypes.object,
    noDataCondition: PropTypes.func,
};

BetListTable.defaultProps = {
    isPaging: false,
    pageOption: {
        PageIndex: 1,
        PageSize: 50,
        TotalItem: 0,
        PageList: [50, 100, 200, 300, 400, 500, 1000, 2000],
    },
    columns: [
        'Index',
        'ExternalId',
        'SystemId',
        'RefNo',
        'TransTime',
        'Choice',
        'Odds',
        'OddsType',
        'Stake',
        'WinLoss',
        'LicenseeWL',
        'Status',
        'Platform',
        'Live',
    ],
    columnWidths: [40, 120, 120, 110, 150, 400, 70, 70, 100, 100, 100, 80, 80, 80],
    sortableColumns: ['Stake', 'WinLoss', 'LicenseeWL'],
    totalColumns: ['Stake', 'WinLoss', 'LicenseeWL'],
    columnAlignments: [
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.LEFT,
        ALIGNMENT_CLASSES.LEFT,
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.CENTER,
    ],
    data: null,
    total: null,
    totalText: 'Total',
    adjustedHeight: 0,
    customHeaderCell: null,
    customFooterRow: null,
};

export default React.memo(BetListTable);
