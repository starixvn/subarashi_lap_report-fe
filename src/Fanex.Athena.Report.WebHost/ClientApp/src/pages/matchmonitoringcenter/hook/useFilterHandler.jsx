import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../actions';
import { useCallback } from 'react';

export const useFilterHandler = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);

    const {
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setBaseCurrencyList,
        setSelectedMatchStatus,
        setSelectedTriggeredAlert,
        setSelectedMatch,
        setSelectedLeague,
        getMatchList,
    } = ActionCreators;

    const onChangeSelectedCurrency = useCallback((currency) => {
        if (currency.value === 0) {
            const defaultCurrency = formData.baseCurrencies.find((x) => x.value === -1);
            dispatch(setSelectedBaseCurrency({ ...defaultCurrency }), []);
            dispatch(setSelectedCurrency(currency), []);
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]), []);
            return;
        }

        let newSelectedBaseCurrency = currency;
        if (!formData.baseCurrencies.find((x) => x.label === currency.label)) {
            const newBaseCurrencyList = formData.baseCurrencies.slice(0);
            newSelectedBaseCurrency = { ...currency, isEmpty: true };
            newBaseCurrencyList.push(newSelectedBaseCurrency);
            dispatch(setBaseCurrencyList(newBaseCurrencyList));
        } else {
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]));
        }

        dispatch(setSelectedCurrency(currency));
        dispatch(setSelectedBaseCurrency({ ...newSelectedBaseCurrency }));
    }, []);

    const onChangeSelectedBaseCurrency = useCallback((currency) => dispatch(setSelectedBaseCurrency(currency)), []);

    const onChangeSelectedMatchStatus = useCallback((status) => dispatch(setSelectedMatchStatus(status)), []);

    const onChangeSelectedTriggeredAlert = useCallback((alert) => dispatch(setSelectedTriggeredAlert(alert)), []);

    const onChangeSelectedLeague = useCallback((currentItem, selectedItemsKey) => {
        dispatch(getMatchList(selectedItemsKey));
        dispatch(setSelectedLeague(selectedItemsKey));
    }, []);

    const onChangeSelectedMatch = useCallback((currentItem, selectedItemsKey) => dispatch(setSelectedMatch(selectedItemsKey)), []);

    return {
        onChangeSelectedCurrency,
        onChangeSelectedBaseCurrency,
        onChangeSelectedMatchStatus,
        onChangeSelectedTriggeredAlert,
        onChangeSelectedLeague,
        onChangeSelectedMatch,
    };
};

export default useFilterHandler;
