import filterAction from './filterAction';
import dataAction from './dataAction';
import sportAction from './sportAction';
import bettypeAction from './bettypeAction';
import * as productAction from '@/actions/productAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as statusAction from '@/actions/statusAction';
import * as loaderAction from '@/actions/loaderAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as reportTitleAction from '@/actions/reportTitleAction';
import * as usernameAction from '@/actions/usernameAction';
import * as formDataAction from '@/actions/formDataAction';

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
