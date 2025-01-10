import { useSelector, shallowEqual } from 'react-redux';

import Service from '../../common/Service.js';
import { BreakdownByMode, GroupByMode } from '../../common/constants.js';

export const useRenderRowOption = () => {
    const [requestParam, selectedProduct] = useSelector((state) => [state.requestParam, state.selectedProduct], shallowEqual);
    const isShowBAField = Service.isContainBAProduct(selectedProduct);
    const isGroupByPlayerMode = requestParam.GroupMode == GroupByMode.Player;
    const isShowBetEffectiveField = isGroupByPlayerMode;
    const isBreakDownPlayerMode = requestParam.BreakdownMode == BreakdownByMode.Player;

    return { isShowBAField, isGroupByPlayerMode, isBreakDownPlayerMode, isShowBetEffectiveField };
};

export default useRenderRowOption;
