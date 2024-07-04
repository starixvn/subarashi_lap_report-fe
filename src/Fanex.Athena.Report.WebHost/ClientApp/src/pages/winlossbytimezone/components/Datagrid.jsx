import React from 'react';
import { Table } from '@legion-lib/react-grid';
import NoDataTitle from '@srcRoot/components/NoDataTitle';
import ReportTitle from '@srcRoot/components/ReportTitle';
import Service from '../lib/service';
import { useSelector } from 'react-redux';
import { BuildBody, BuildFooter, BuildHeader } from '../gridBuilder';
import { TimeZones } from '../constants';

const DataGrid = () => {
    const gridData = useSelector((state) => state.gridData);
    const requestParam = useSelector((state) => state.requestParam);

    if (!gridData) {
        return null;
    }

    const { FromDate, ToDate, BaseCurrency, CurrencyName, IsConvertAll, ReportBy, GroupBy, TimeZone } = requestParam;
    const selectedTimezone = TimeZones.find((tz) => tz.value == TimeZone)?.label;

    if (!gridData.data?.length) {
        return (
            <div className="result-content">
                <ReportTitle content={Service.getReportTitle(selectedTimezone, FromDate, ToDate, CurrencyName, BaseCurrency, IsConvertAll)} />
                <NoDataTitle />
            </div>
        );
    }

    const options = { reportBy: ReportBy, groupBy: GroupBy };
    const footerOptions = { reportBy: ReportBy, baseCurrency: BaseCurrency };

    return (
        <div className="result-content">
            <ReportTitle content={Service.getReportTitle(selectedTimezone, FromDate, ToDate, CurrencyName, BaseCurrency, IsConvertAll)} />

            <Table
                minWidth={600}
                autoWidth={true}
                bodyHeight={300}
                header={BuildHeader(options)}
                body={BuildBody(gridData.data, options)}
                footer={BuildFooter(gridData.total, footerOptions)}
            />
        </div>
    );
};

export default DataGrid;
