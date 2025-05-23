import * as filterAction from './filterAction';
import * as dataAction from './dataAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as loaderAction from '@/actions/loaderAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as reportTitleAction from '@/actions/reportTitleAction';
import * as formDataAction from '@/actions/formDataAction';
import * as gridDataAction from '@/actions/gridDataAction';

export const ActionCreators = {
    ...filterAction,
    ...dataAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...loaderAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...formDataAction,
    ...gridDataAction,
};
