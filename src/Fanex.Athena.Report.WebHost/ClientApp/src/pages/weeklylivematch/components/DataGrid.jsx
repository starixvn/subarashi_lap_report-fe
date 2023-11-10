import React from "react";
import { useSelector } from "react-redux";
import LangHelper from "@srcRoot/helpers/langHelper";
import { MAX_WIDTH_PAGE, MIN_WIDTH_PAGE } from "@srcRoot/constants/config";
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import NoDataTitle from "@srcRoot/components/NoDataTitle";

const DataGrid = (props) => {
    const gridData = useSelector(state => state.gridData);
    if (JSON.stringify(gridData) === JSON.stringify({})) {
        return null;
    }

    if (!gridData) {
        return <NoDataTitle />;
    }

    const _buildHeader = (headers) => {
        var headerCells = [
            <HeaderCell colWidth={40} >#</HeaderCell>,
            <HeaderCell colWidth={180}>{LangHelper.getSingleResource('Sport')}</HeaderCell>,
            ...headers.map(header => (<HeaderCell colWidth={90} key={`header-${header}`}>{header}</HeaderCell>))
        ];
        return ([
            <HeaderRow style={{ height: 23 }} key='header'>
                {headerCells}
            </HeaderRow>,
        ])
    }

    const _buildBody = (data) => {
        return data.map((item, indexCell) => {
            return (
                <Row key={`row-${item[indexCell]}`}>
                    {item.Cell.map((cell, index) => {
                        const className = index === 0 ? 'center-align': index === 1 ? 'left-align' : 'right-align';
                        return(<Cell className={className} key={`col-${index}`}>{cell}</Cell>);
                    })}
                </Row>
            );
        });
    }

    const _buildFooter = (totalData) => {
        return (
            <Row key={"footer"}>
                <Cell className="center-align" colSpan={2}>{LangHelper.getSingleResource('Total')}</Cell>
                {totalData.map((total, index) => (
                    <Cell className="right-align" key={`footer-${index}`}>{total}</Cell>
                ))}
            </Row>
        );
    }

    return (
        <React.Fragment>
            <Table minWidth={MIN_WIDTH_PAGE}
                autoWidth={true}
                maxWidth={MAX_WIDTH_PAGE}
                autoHeight={true}
                header={_buildHeader(gridData.WeekHeaders)}
                body={_buildBody(gridData.Data)}
                footer={_buildFooter(gridData.TotalData)}
                containerPadding={30}
                shouldResetScrollPosition={true} />
        </React.Fragment>
    );
};

export default React.memo(DataGrid);
