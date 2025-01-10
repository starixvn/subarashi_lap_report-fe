import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import Service, { constants } from '../common';

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
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
        </div>
    );
};

export default React.memo(FormFilter);
