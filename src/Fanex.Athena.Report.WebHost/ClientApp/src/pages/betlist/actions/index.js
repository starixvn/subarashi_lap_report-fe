import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';

export const ActionCreators = {
    ...requestParamAction,
    ...formDataAction,
    ...loaderAction,
    ...gridDataAction,
};
