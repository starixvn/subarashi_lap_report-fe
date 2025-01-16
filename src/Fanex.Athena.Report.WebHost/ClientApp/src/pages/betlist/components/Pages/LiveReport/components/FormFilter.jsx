import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import LangHelper from '@srcRoot/helpers/langHelper';
import ExportExcel from '@srcRoot/components/ExportExcel';

const LiveReportFormFilter = (props) => {
    const navigate = useNavigate();
    const [formData, requestParam] = useSelector((state) => [state.formData, state.requestParam], shallowEqual);

    const { isValidExcel, processExcel } = props;
    const exportExcel = () => {
        if (!isValidExcel) {
            return;
        }

        processExcel(`${formData.url}ExportExcel`, requestParam, 'LiveReportBetList.xls');
    };

    const getReportTitle = (title, fromDate, toDate) => {
        if (!fromDate) {
            return `${title} - `;
        }

        if (!toDate) {
            return `${formData.title} - ${formData.fromDate} - `;
        }

        return (
            <>
                {`${title} - ${fromDate}`}
                <span className="header-title-arrow"> → </span>
                {`${toDate} - `}
            </>
        );
    };

    return (
        <p className="content-title">
            {getReportTitle(formData.title, formData.fromDate, formData.toDate)}
            <span className="base-currency">{LangHelper.getSingleResource('Viewin').replace('{0}', formData.baseCurrency.toUpperCase())}</span>
            <ExportExcel onClick={exportExcel} />
            <i className="icon-back right" onClick={() => navigate(-1)}></i>
        </p>
    );
};

export default React.memo(LiveReportFormFilter);
