import filterAction from './filterAction';
import dataAction from './dataAction';
import sportAction from './sportAction';
import bettypeAction from './bettypeAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as statusAction from '@srcRoot/actions/statusAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as reportTitleAction from '@srcRoot/actions/reportTitleAction';
import * as usernameAction from '@srcRoot/actions/usernameAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';

export default {
    ...filterAction,
    ...dataAction,
    ...sportAction,
    ...bettypeAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...statusAction,
    ...loaderAction,
    ...dateRangeAction,
    ...userGuideAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...usernameAction,
    ...formDataAction,
};
