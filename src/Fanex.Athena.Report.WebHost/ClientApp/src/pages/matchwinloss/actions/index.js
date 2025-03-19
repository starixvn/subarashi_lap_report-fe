import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as productAction from '@/actions/productAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as currencyAction from '@/actions/currencyAction';
import * as dateAction from '@/actions/dateAction';

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
