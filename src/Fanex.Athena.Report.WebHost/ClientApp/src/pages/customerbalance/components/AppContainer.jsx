import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/components/Loader';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';

import { ActionCreators } from '../actions/index';
import DataGrid from './DataGrid';
import FormFilter from './FormFilter';
import { constants } from '../common';

export const AppContainer = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedProducts, setDateRange } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        result.data.currencies = result.data.currencies.map((item) => ({ value: item.key, label: item.value }));
        result.data.IsExcludedTestData = true;
        dispatch(setFormData(result.data));
        dispatch(setSelectedProducts(result.data.productOptions));
        dispatch(
            setDateRange({
                startDate: constants.DateConstraint.today,
                endDate: constants.DateConstraint.today,
            })
        );
    };

    useEffect(() => {
        sendRequest(() => DataService.postReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
