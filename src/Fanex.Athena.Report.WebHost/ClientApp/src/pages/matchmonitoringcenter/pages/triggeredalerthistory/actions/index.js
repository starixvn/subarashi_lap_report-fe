import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as dataAction from './dataAction';

export const ActionCreators = {
    ...loaderAction,
    ...gridDataAction,
    ...dataAction,
};
