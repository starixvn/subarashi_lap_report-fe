import * as tabHandlerActions from '@/actions/tabHandlerAction';
import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as filterAction from './filterAction';

export default {
    ...tabHandlerActions,
    ...loaderAction,
    ...gridDataAction,
    ...filterAction,
};
