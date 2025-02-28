import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';
import ReportTitle from '@/components/ReportTitle';

import Service, { constants } from '../common';
import { BuildBody, BuildFooter, BuildHeader } from '../gridBuilder';

const DataGrid = (props) => {
    const { TableSettings } = constants;

    const gridData = useSelector((state) => state.gridData);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);

    if (!gridData) {
        return null;
    }

    const { isAllowedCustomerCommission, isAllowedCasinoTransfer, isAllowBa, isEnableSingleWallet, isHidePlayerWl } = formData;
    const { FromDate, ToDate, CurrencyName, BaseCurrencyName, UserName } = requestParam;

    if (!gridData.data.length) {
        return (
            <>
                <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, BaseCurrencyName, UserName)} />
                <NoDataTitle />
            </>
        );
    }

    const options = {
        hasCustomerComm: isAllowedCustomerCommission,
        hasCasinoTransfer: isAllowedCasinoTransfer,
        isAllowBa: isAllowBa,
        isEnableSingleWallet: isEnableSingleWallet,
        isHidePlayerWL: isHidePlayerWl,
    };

    const minWidth = options.isEnableSingleWallet ? TableSettings.MinWidthSingleWallet : TableSettings.MinWidthNormal;

    return (
        <>
            <ReportTitle content={Service.generateReportTitle(FromDate, ToDate, CurrencyName, BaseCurrencyName, UserName)} />
            <Table
                minWidth={minWidth}
                autoWidth={true}
                header={BuildHeader(options)}
                body={BuildBody(gridData.data, options)}
                footer={BuildFooter(gridData.totalData, options)}
                containerPadding={30}
                shouldResetScrollPosition={true}
            />
        </>
    );
};

export default React.memo(DataGrid);
