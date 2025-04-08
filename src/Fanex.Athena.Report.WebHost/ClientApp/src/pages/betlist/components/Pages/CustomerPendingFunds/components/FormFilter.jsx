import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ApiUrl } from '../constant/apiSettings';
import LangHelper from '@/helpers/langHelper';

const FormFilter = (props) => {
    const [formData, requestParam] = useSelector((state) => [state.formData, state.requestParam], shallowEqual);

    const { isValidExcel, processExcel } = props;
    const exportExcel = () => {
        if (!isValidExcel) {
            return;
        }

        processExcel(ApiUrl.EXPORT_EXCEL_URL, requestParam, 'CustomerPendingFundsBetList.xls');
    };

    return (
        <p className="content-title">
            {`${formData.title} - `}
            <span className="base-currency">{LangHelper.getSingleResource('Viewin').replace('{0}', formData.baseCurrency.toUpperCase())}</span>
            <i className="icon-excel right" onClick={exportExcel} title={LangHelper.getSingleResource('ExportToExcel')}></i>
        </p>
    );
};

export default React.memo(FormFilter);
