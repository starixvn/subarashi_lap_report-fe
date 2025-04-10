import filterAction from './filterAction';
import dataAction from './dataAction';
import promotionTypeAction from './promotionTypeAction';
import * as productAction from '@/actions/productAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as loaderAction from '@/actions/loaderAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as reportTitleAction from '@/actions/reportTitleAction';
import * as subsidiaryAction from '@/actions/subsidiaryAction';
import * as formDataAction from '@/actions/formDataAction';

export default {
    ...filterAction,
    ...dataAction,
    ...promotionTypeAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...loaderAction,
    ...dateRangeAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...subsidiaryAction,
    ...formDataAction,
};
