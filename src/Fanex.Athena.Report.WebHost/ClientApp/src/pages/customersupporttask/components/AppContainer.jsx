import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@srcRoot/components/Loader';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import DataService from '@srcRoot/lib/dataService';

import { ActionCreators } from '../actions/index';
import FormFilter from './FormFilter';
import constants from '../constants';
import { SupportTaskOptions } from '../lib/constants';

export const AppContainer = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setSelectedCurrency, setSelectedSupportTask } = ActionCreators;

    const setInitFormData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));
            return;
        }

        if (result.data.currencies.length) {
            result.data.currencies = result.data.currencies.map((item) => ({ ...item, status: true }));
            const defaultSelectedCurrency = result.data.currencies.map((item) => item.key).join(',');
            dispatch(setSelectedCurrency(defaultSelectedCurrency));
        }

        dispatch(setSelectedSupportTask(SupportTaskOptions[0]));
        dispatch(setFormData(result.data));
    };

    useEffect(() => {
        sendRequest(() => DataService.postReportData(constants.ApiUrl.INIT_FORM_URL), setInitFormData);
    }, []);

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            {formData && <FormFilter />}
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
