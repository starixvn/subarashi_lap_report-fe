import React from 'react';
import { getBetListPageWithPageName } from './Pages';
import { useSelector } from 'react-redux';

import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';

import Service, { constants } from '../common';

function BetListFormFilter() {
    const formData = useSelector((state) => state.formData);
    const gridData = useSelector((state) => state.gridData);

    const { sendRequest } = useToggleRequest();

    const processExcel = (url, params, fileName) =>
        sendRequest(
            () => DataService.getReportFile(url, params),
            (res) => Service.downloadExcelFile(res, fileName)
        );

    const isValidExcel = () => {
        if (gridData.totalRows > constants.MAXIMUM_EXCEL_ROWS) {
            alert(LangHelper.getSingleResource('ExcelExceedRowsMsg'));
            return false;
        }

        return true;
    };

    const FormFilter = getBetListPageWithPageName(formData.pageName).FormFilter;

    return <FormFilter processExcel={processExcel} isValidExcel={isValidExcel} />;
}

export default BetListFormFilter;
