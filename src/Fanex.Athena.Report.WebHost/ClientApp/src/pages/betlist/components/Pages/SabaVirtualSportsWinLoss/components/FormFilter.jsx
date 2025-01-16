import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import ExportExcel from '@srcRoot/components/ExportExcel';
import LangHelper from '@srcRoot/helpers/langHelper';

const FormFilter = (props) => {
    const [formData, requestParam] = useSelector((state) => [state.formData, state.requestParam], shallowEqual);

    const { isValidExcel, processExcel } = props;
    const exportExcel = () => {
        if (!isValidExcel) {
            return;
        }

        processExcel(`api/SabaVirtualSportsWinLossBetList/ExportExcel`, requestParam, 'SabaVirtualSportsBetList.xls');
    };

    return (
        <p className="content-title">
            {`${LangHelper.getSingleResource('CustomerBetList')} ${formData.fromDate}`}
            <span className="header-title-arrow"> → </span>
            {`${formData.toDate} - ${formData.title} - `}
            <span className="base-currency">{LangHelper.getSingleResource('Viewin').replace('{0}', formData.baseCurrency)}</span>
            <ExportExcel onClick={exportExcel} />
        </p>
    );
};

export default React.memo(FormFilter);
