import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LangHelper from '@/helpers/langHelper';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import ExportExcel from '@/components/ExportExcel';
import { constants } from '../common';

const FormFilter = (props) => {
    const navigate = useNavigate();
    const requestParam = useSelector((state) => state.requestParam);

    const handler = useToggleRequest();

    const { ApiUrl } = constants;
    const onExportExcel = () => {
        handler.sendRequest(
            () => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, requestParam),
            (response) => Site.downloadFile(response.data, 'LiveReport.xls')
        );
    };

    return (
        <div className="form-filter">
            <button type="button" className="waves-effect waves-light btn btn-back" onClick={() => navigate(-1)}>
                <i className="icon-arrow"></i>
                {LangHelper.getSingleResource('Back').toUpperCase()}
            </button>
            <ExportExcel onClick={onExportExcel} />
        </div>
    );
};

export default React.memo(FormFilter);
