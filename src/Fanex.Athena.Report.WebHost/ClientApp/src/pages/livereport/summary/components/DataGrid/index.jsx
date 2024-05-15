import React from 'react';
import { useSelector } from 'react-redux';

import NoDataTitle from '@srcRoot/components/NoDataTitle';
import ReportTitle from '@srcRoot/components/ReportTitle';
import Service from '../../common';
import SummaryDataGrid from './SummaryDataGrid';
import BySportDataGrid from './BySportDataGrid';
import ByCurrencyDataGrid from './ByCurrencyDataGrid';
import ByBetTypeDataGrid from './ByBetTypeDataGrid';

const DataGrid = (props) => {
    const gridData = useSelector((state) => state.gridData);
    const requestParam = useSelector((state) => state.requestParam);

    if (!gridData?.summary) {
        return;
    }

    if (!gridData.summary.length) {
        return (
            <>
                <ReportTitle
                    content={Service.generateReportTitle(
                        requestParam.LiveIndicator,
                        requestParam.FromDate,
                        requestParam.ToDate,
                        requestParam.CurrencyName == 'ALL' ? requestParam.BaseCurrency : requestParam.CurrencyName
                    )}
                />
                <NoDataTitle />
            </>
        );
    }

    return (
        <>
            <ReportTitle
                content={Service.generateReportTitle(
                    requestParam.LiveIndicator,
                    requestParam.FromDate,
                    requestParam.ToDate,
                    requestParam.CurrencyName == 'ALL' ? requestParam.BaseCurrency : requestParam.CurrencyName
                )}
            />
            <SummaryDataGrid />
            <BySportDataGrid />
            <ByCurrencyDataGrid />
            <ByBetTypeDataGrid />
        </>
    );
};

export default React.memo(DataGrid);
