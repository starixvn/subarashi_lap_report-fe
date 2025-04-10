import React from 'react';
import { useSelector } from 'react-redux';

import BetListTable from '@/components/BetListTable';

import tableSettings from '../constant/tableSettings';

const MatchWinLossTable = ({ totalRows, ...rest }) => {
    const requestParam = useSelector((state) => state.requestParam);

    const pageOption = {
        PageIndex: requestParam.Page,
        PageSize: requestParam.Rows,
        TotalItem: totalRows ? totalRows : tableSettings.DefaultPageSize,
        PageList: tableSettings.PageList,
    };

    return (
        <BetListTable
            isPaging={true}
            pageOption={pageOption}
            columns={tableSettings.Columns}
            columnWidths={tableSettings.ColumnWidths}
            sortableColumns={tableSettings.SortableColumns}
            totalColumns={tableSettings.TotalColumns}
            columnAlignments={tableSettings.ColumnAlignments}
            {...rest}
        />
    );
};

export default React.memo(MatchWinLossTable);
