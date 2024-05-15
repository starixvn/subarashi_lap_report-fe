import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';

export const ActionCreators = {
    ...requestParamAction,
    ...formDataAction,
    ...loaderAction,
    ...gridDataAction,
};
