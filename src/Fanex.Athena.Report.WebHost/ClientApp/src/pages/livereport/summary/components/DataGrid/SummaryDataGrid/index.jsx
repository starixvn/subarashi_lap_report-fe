import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LiveReportTable } from '../../../gridUltility';
import LangHelper from '@srcRoot/helpers/langHelper';
import { BuildSummaryBody, BuildSummaryFooter, BuildSummaryHeaders } from './GridBuilder';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';
import { constants } from '../../../common';
import { ActionCreators } from '../../../actions';

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

    const footerData = summaryGridData.reduce(
        (total, item) => {
            total.turnOver += item.turnOver;
            total.betCount += item.betCount;
            total.licenseeWinLoss += item.licenseeWinLoss;
            total.licenseeComm += item.licenseeComm;
            total.amountDue += item.amountDue;
            total.customerWinLoss += item.customerWinLoss;
            total.customerComm += item.customerComm;
            total.customerTotal += item.customerTotal;
            return total;
        },
        {
            turnOver: 0,
            betCount: 0,
            licenseeWinLoss: 0,
            licenseeComm: 0,
            amountDue: 0,
            customerWinLoss: 0,
            customerComm: 0,
            customerTotal: 0,
        }
    );

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
