import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as usernameAction from '@srcRoot/actions/usernameAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';

export const ActionCreators = {
    ...dateRangeAction,
    ...productAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...usernameAction,
    ...currencyAction,
    ...baseCurrencyAction,
};
