import { useSelector, shallowEqual } from 'react-redux';
import { BreakdownByMode, GroupByMode } from '../../common/constants.js';

export const useRenderRowOption = () => {
    const [requestParam] = useSelector(state => [state.requestParam, state.selectedProduct], shallowEqual);
    const isGroupByPlayerMode = requestParam.GroupMode === GroupByMode.Player;
    const isShowBetEffectiveField = isGroupByPlayerMode;
    const isBreakDownPlayerMode = requestParam.BreakdownMode === BreakdownByMode.Player;

    return { isGroupByPlayerMode, isBreakDownPlayerMode, isShowBetEffectiveField };
};

export default useRenderRowOption;
