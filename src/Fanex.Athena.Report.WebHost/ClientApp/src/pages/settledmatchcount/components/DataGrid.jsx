import React from 'react';
import { useSelector } from 'react-redux';
import LangHelper from '@srcRoot/helpers/langHelper';
import moment from 'moment';
import { MAX_WIDTH_PAGE, MIN_WIDTH_PAGE } from '@srcRoot/constants/config';
import { Table, Row, Cell, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import NoDataTitle from '@srcRoot/components/NoDataTitle';

const DataGrid = (props) => {
    const gridData = useSelector((state) => state.gridData);
    if (JSON.stringify(gridData) === JSON.stringify({})) {
        return null;
    }

    if (!gridData) {
        return <NoDataTitle />;
    }

    const _buildHeader = () => {
        const now = moment();
        const today = now.format('MM/DD/yyyy');
        const lastDay = now.clone().add(-1, 'd').format('MM/DD/yyyy');

        return [
            <HeaderRow style={{ height: 23 }} key="header1">
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('Date')}</HeaderCell>
                <HeaderCell colWidth={620} colSpan={2}>
                    {lastDay}
                </HeaderCell>
                <HeaderCell colWidth={620} colSpan={2}>
                    {today}
                </HeaderCell>
            </HeaderRow>,
            <HeaderRow style={{ height: 23 }} key="header2">
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('Results')}</HeaderCell>
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('Entered')}</HeaderCell>
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('NonEntered')}</HeaderCell>
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('Entered')}</HeaderCell>
                <HeaderCell colWidth={310}>{LangHelper.getSingleResource('NonEntered')}</HeaderCell>
            </HeaderRow>,
        ];
    };

    const _buildBody = (data) => {
        return data.map((item) => {
            return (
                <Row key={`settled_match_count_row_${item.sportName}`}>
                    <Cell className="left-align">{item.sportName}</Cell>
                    <Cell className="right-align">{item.yesterdayEntered}</Cell>
                    <Cell className="right-align">{item.yesterdayNonEntered}</Cell>
                    <Cell className="right-align">{item.todayEntered}</Cell>
                    <Cell className="right-align">{item.todayNonEntered}</Cell>
                </Row>
            );
        });
    };

    return (
        <React.Fragment>
            <Table
                minWidth={MIN_WIDTH_PAGE}
                autoWidth={true}
                maxWidth={MAX_WIDTH_PAGE}
                autoHeight={true}
                header={_buildHeader()}
                body={_buildBody(gridData)}
                containerPadding={30}
                shouldResetScrollPosition={true}
            />
        </React.Fragment>
    );
};

export default React.memo(DataGrid);
