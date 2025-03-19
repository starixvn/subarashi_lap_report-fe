import React from 'react';
import { useSelector } from 'react-redux';

import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';
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

    const currencyText = requestParam.CurrencyId != 0 && !requestParam.BaseCurrency ? requestParam.CurrencyName : requestParam.BaseCurrency ;

    if (!gridData.summary.length) {
        return (
            <>
                <ReportTitle
                    content={Service.generateReportTitle(
                        requestParam.LiveIndicator,
                        requestParam.FromDate,
                        requestParam.ToDate,
                        currencyText
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
                    currencyText
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
