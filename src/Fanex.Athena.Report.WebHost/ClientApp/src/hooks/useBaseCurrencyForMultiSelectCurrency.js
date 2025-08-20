import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useIsFirstRender } from 'usehooks-ts';

export const useBaseCurrencyForMultiSelectCurrency = (initSelectedBaseCurrency, currencies) => {
    const [originalBaseCurrencyList, originalCurrencyList] = [currencies.baseCurrencyList, currencies.currencyList];
    const defaultBaseCurrencyRef = useRef(initSelectedBaseCurrency);
    const isFirstRender = useIsFirstRender();
    const [selectedCurrency, selectedBaseCurrency] = useSelector(state => [state.selectedCurrency, state.selectedBaseCurrency], shallowEqual);
    const [currentBaseCurrencyList, setCurrentBaseCurrencyList] = useState(originalBaseCurrencyList);
    const [currentBaseCurrency, setCurrenctBaseCurrency] = useState(selectedBaseCurrency);

    useEffect(() => {
        if (currentBaseCurrency.value !== selectedBaseCurrency.value) {
            setCurrenctBaseCurrency(selectedBaseCurrency);
        }
    }, [selectedBaseCurrency]);

    useEffect(() => {
        const defaultBaseCurrency = defaultBaseCurrencyRef.current;

        let newBaseCurrency;
        let newBaseCurrencyList = currentBaseCurrencyList;
        const _isSingleSelectedCurrency = () => selectedCurrency && selectedCurrency.indexOf(',') < 0;

        if (_isSingleSelectedCurrency()) {
            const currency = originalCurrencyList.find(x => x.id === selectedCurrency);
            if (!currentBaseCurrencyList.find(x => x.label === currency.value)) {
                newBaseCurrency = { value: currency.id, label: currency.value };
                newBaseCurrencyList = originalBaseCurrencyList.slice(0);
                newBaseCurrencyList.push(newBaseCurrency);
            } else {
                newBaseCurrency = { value: currency.id, label: currency.value };
                newBaseCurrencyList = currentBaseCurrencyList;
            }
        } else {
            newBaseCurrencyList = originalBaseCurrencyList;
            newBaseCurrency = newBaseCurrencyList.find(x => x.value === selectedBaseCurrency.value) ? selectedBaseCurrency : defaultBaseCurrency;
        }

        if (newBaseCurrencyList !== currentBaseCurrencyList) {
            setCurrentBaseCurrencyList(newBaseCurrencyList);
        }
        if (newBaseCurrency !== currentBaseCurrency) {
            setCurrenctBaseCurrency(newBaseCurrency);
        }
    }, [selectedCurrency]);

    if (isFirstRender && !initSelectedBaseCurrency) {
        defaultBaseCurrencyRef.current = selectedBaseCurrency;
    }

    return {
        baseCurrencyList: currentBaseCurrencyList,
        selectedBaseCurrency: currentBaseCurrency,
    };
};

export default useBaseCurrencyForMultiSelectCurrency;
