import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as dateAction from '@srcRoot/actions/dateAction';

export const ActionCreators = {
    ...dateAction,
    ...productAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...baseCurrencyAction,
    ...currencyAction,
};
