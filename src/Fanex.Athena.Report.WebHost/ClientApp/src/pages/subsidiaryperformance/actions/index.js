import * as loaderAction from '@/actions/loaderAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as productAction from '@/actions/productAction';
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
