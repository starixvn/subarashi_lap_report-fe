import React, { useEffect } from 'react';
import Loader from '@/components/Loader';
import DataGrid from './components/DataGrid';
import { useDispatch, useSelector } from 'react-redux';
import { constants } from './common';
import DataService from '@/lib/dataService';
import useToggleRequest from '@/hooks/useToggleRequest';

import { ActionCreators } from './actions';

const AppContainer = () => {
    const dispatch = useDispatch();
    const { sendRequest } = useToggleRequest();
    const { setGridData } = ActionCreators;
    const { ApiUrl } = constants;

    const [isLoading, monitoringId] = useSelector(state => [state.isLoading, state.monitoringId]);

    useEffect(() => {
        const params = { monitoringId };
        sendRequest(() => DataService.getReportData(ApiUrl.INIT_FORM_URL, params), updateData);
    }, []);

    const updateData = result => {
        if (result && result.data !== null) {
            const gridData = result.data;

            dispatch(setGridData(gridData));
            return;
        }

        dispatch(setGridData(null));
    };

    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
