import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import ExportExcel from '@/components/ExportExcel';
import LangHelper from '@/helpers/langHelper';

const FormFilter = (props) => {
    const [formData, requestParam] = useSelector((state) => [state.formData, state.requestParam], shallowEqual);

    const { isValidExcel, processExcel } = props;
    const exportExcel = () => {
        if (!isValidExcel) {
            return;
        }

        processExcel(`api/CustomerPendingFundsBetList/ExportExcel`, requestParam, 'CustomerPendingFundsBetList.xls');
    };

    return (
        <p className="content-title">
            {`${formData.title} - `}
            <span className="base-currency">{LangHelper.getSingleResource('Viewin').replace('{0}', formData.baseCurrency)}</span>
            <ExportExcel onClick={exportExcel} />
        </p>
    );
};

export default React.memo(FormFilter);
