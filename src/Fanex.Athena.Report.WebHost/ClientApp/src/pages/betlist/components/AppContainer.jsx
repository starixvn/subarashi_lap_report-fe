import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom/dist';

import Loader from '@/components/Loader';
import BetListLayout from '@/layouts/BetListLayout';
import useToggleRequest from '@/hooks/useToggleRequest';
import Site from '@/lib/site';
import DataService from '@/lib/dataService';
import BetListHelper from '@/helpers/betlistHelper';

import { ActionCreators } from '../actions';
import Service from '../common';
import DataGrid from './DataGrid';
import BetListFormFilter from './FormFilter';

export const AppContainer = () => {
    const location = useLocation();
    const { controller, action } = useParams();

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const isLoading = useSelector((state) => state.isLoading);

    const { sendRequest } = useToggleRequest();

    const { setFormData, setGridData, setRequestParam } = ActionCreators;

    const setInitData = (result) => {
        if (!result || !result.data) {
            dispatch(setFormData(null));

            return;
        }
        const data = result.data;

        dispatch(setRequestParam({ ...Service.loadInitParams(location.search) }));

        dispatch(setGridData(BetListHelper.loadBetListDataGrid(data.data, data.settings.isServerPaging)));

        data.settings.url = `api/${Service.convertToBetListController(controller)}/${action}`;
        data.settings.pageName = controller;

        dispatch(setFormData(data.settings));
    };

    useEffect(() => {
        let query = Service.initQuery(location.search);
        query += Service.getSettingQuery();

        const betListController = Service.convertToBetListController(controller);
        sendRequest(() => DataService.getBetListData(`api/${betListController}/${action}${query}`), setInitData);
    }, []);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${date.getFullYear()}`;
    };

    if (!formData && isLoading) {
        return <Loader isLoading={true} />;
    }

    return (
        <React.Suspense fallback={<Loader isLoading={true} />}>
            <div className="betlist-container">
                <BetListLayout
                    pageName="Bet List Promotion"
                    rootUrl={Site.getRootUrl()}
                    formatDateStringFunc={formatDateString}
                    baseCurrency={formData.baseCurrency}>
                    <Loader isLoading={isLoading} />
                    <BetListFormFilter />
                    <DataGrid />
                </BetListLayout>
            </div>
        </React.Suspense>
    );
};

export default React.memo(AppContainer);
