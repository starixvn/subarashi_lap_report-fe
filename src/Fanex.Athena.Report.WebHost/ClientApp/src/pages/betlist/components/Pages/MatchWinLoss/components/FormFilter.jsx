import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import LangHelper from '@/helpers/langHelper';
import ExportExcel from '@/components/ExportExcel';
import { ApiUrl } from '../constant/apiSettings';

const MatchWinLossFormFilter = (props) => {
    const navigate = useNavigate();
    const [formData, requestParam] = useSelector((state) => [state.formData, state.requestParam], shallowEqual);

    const { isValidExcel, processExcel } = props;
    const exportExcel = () => {
        if (!isValidExcel) {
            return;
        }

        processExcel(ApiUrl.EXPORT_EXCEL_URL, requestParam, 'MatchWinLossBetList.xls');
    };

    const baseCurrency = formData.baseCurrency ?? requestParam.CurrencyName;

    return (
        <p className="content-title">
            {`${formData.title} - ${formData.fromDate} - `}
            <span className="base-currency">{LangHelper.getSingleResource('Viewin').replace('{0}', baseCurrency.toUpperCase())}</span>
            <ExportExcel onClick={exportExcel} />
            <i className="icon-back right" onClick={() => navigate(-1)}></i>
        </p>
    );
};

export default React.memo(MatchWinLossFormFilter);
