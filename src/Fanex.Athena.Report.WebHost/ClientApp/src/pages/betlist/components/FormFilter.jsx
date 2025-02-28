import React from 'react';
import { getBetListPageWithPageName } from './Pages';
import { useSelector } from 'react-redux';

import useToggleRequest from '@/hooks/useToggleRequest';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';

import Service, { constants } from '../common';

function BetListFormFilter() {
    const formData = useSelector((state) => state.formData);
    const gridData = useSelector((state) => state.gridData);

    const { sendRequest } = useToggleRequest();

    const processExcel = (url, params, fileName) =>
        sendRequest(
            () => DataService.getBetListFile(url, params),
            (res) => Service.downloadExcelFile(res, fileName),
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
