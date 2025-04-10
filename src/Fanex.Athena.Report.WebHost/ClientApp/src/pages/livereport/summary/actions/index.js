import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as statusAction from '@/actions/statusAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as currencyAction from '@/actions/currencyAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as subsidiaryAction from '@/actions/subsidiaryAction';
import * as filterAction from './filterAction';

export const ActionCreators = {
    ...dateRangeAction,
    ...statusAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...baseCurrencyAction,
    ...currencyAction,
    ...subsidiaryAction,
    ...filterAction,
};
