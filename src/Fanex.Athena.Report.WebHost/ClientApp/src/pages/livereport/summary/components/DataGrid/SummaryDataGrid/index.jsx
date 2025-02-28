import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LiveReportTable } from '../../../gridUltility';
import LangHelper from '@/helpers/langHelper';
import { BuildSummaryBody, BuildSummaryFooter, BuildSummaryHeaders } from './GridBuilder';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import { constants } from '../../../common';
import { ActionCreators } from '../../../actions';
import currency from 'currency.js';

function SummaryDataGrid(props) {
    const dispatch = useDispatch();
    const gridData = useSelector((state) => state.gridData);
    const summaryGridData = gridData?.summary;

    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const selectedProductCode = useSelector((state) => state.selectedProductCode);

    const { sendRequest } = useToggleRequest();

    const { ApiUrl } = constants;
    const { setGridData, setRequestParam, setSelectedProductCode } = ActionCreators;
    const options = {
        isAllowedCustomerCommission: formData.isAllowedCustomerCommission,
        isAllowBa: formData.isAllowBa,
        hasAmountDueToColumn: formData.hasAmountDueToColumn,
    };

    if (!summaryGridData) {
        return;
    }

    const onClickDetail = (product) => {
        if (selectedProductCode == product.productCode) {
            return;
        }

        const params = { ...requestParam, ProductCode: product.productCode };

        sendRequest(() => fetchDetailData(ApiUrl.DETAIL_DATA_URL, params), setDetailData);
    };

    const fetchDetailData = async (url, params) => {
        const response = await DataService.postReportData(url, params);
        const data = response.data;

        dispatch(setRequestParam(params));
        dispatch(setSelectedProductCode(params.ProductCode));

        window.dispatchEvent(new Event('resize'));

        return data;
    };

    const setDetailData = (data) => {
        if (!data) {
            return;
        }

        dispatch(setGridData({ ...gridData, ...data }));
    };

    const currencyOption = { fromCents: false, precision: 4 }

    const totalData = summaryGridData.reduce(
        (total, item) => {
            total.turnOver = total.turnOver.add(item.turnOver);
            total.betCount += item.betCount;
            total.licenseeWinLoss = total.licenseeWinLoss.add(item.licenseeWinLoss);
            total.licenseeComm = total.licenseeComm.add(item.licenseeComm);
            total.amountDue = total.amountDue.add(item.amountDue);
            total.customerWinLoss = total.customerWinLoss.add(item.customerWinLoss);
            total.customerComm = total.customerComm.add(item.customerComm);
            total.customerTotal = total.customerTotal.add(item.customerTotal);
            return total;
        },
        {
            turnOver: currency(0, currencyOption),
            betCount: 0,
            licenseeWinLoss: currency(0, currencyOption),
            licenseeComm: currency(0, currencyOption),
            amountDue: currency(0, currencyOption),
            customerWinLoss: currency(0, currencyOption),
            customerComm: currency(0 , currencyOption),
            customerTotal: currency(0, currencyOption),
        }
    );

    const footerData = {
        turnOver: totalData.turnOver.value,
        betCount: totalData.betCount,
        licenseeWinLoss: totalData.licenseeWinLoss.value,
        licenseeComm: totalData.licenseeComm.value,
        amountDue: totalData.amountDue.value,
        customerWinLoss: totalData.customerWinLoss.value,
        customerComm: totalData.customerComm.value,
        customerTotal: totalData.customerTotal.value,
    }

    return (
        <LiveReportTable
            tableTitle={LangHelper.getSingleResource('Summary')}
            header={BuildSummaryHeaders(options)}
            body={BuildSummaryBody(summaryGridData, onClickDetail)}
            footer={BuildSummaryFooter(footerData, onClickDetail)}
        />
    );
}

export default SummaryDataGrid;
