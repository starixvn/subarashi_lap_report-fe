import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as filterAction from './filterAction';
import * as reportDataAction from './reportDataAction';

export default {
    ...loaderAction,
    ...gridDataAction,
    ...requestParamAction,
    ...formDataAction,
    ...currencyAction,
    ...filterAction,
    ...dateRangeAction,
    ...baseCurrencyAction,
    ...productAction,
    ...reportDataAction,
};
