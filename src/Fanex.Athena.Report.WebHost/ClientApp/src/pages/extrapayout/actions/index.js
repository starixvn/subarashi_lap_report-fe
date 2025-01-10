import filterAction from './filterAction';
import dataAction from './dataAction';
import promotionTypeAction from './promotionTypeAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as reportTitleAction from '@srcRoot/actions/reportTitleAction';
import * as subsidiaryAction from '@srcRoot/actions/subsidiaryAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';

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
