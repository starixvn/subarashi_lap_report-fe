import NumberFormat from '@/lib/numberFormat';
import { SortKeys } from './filter';

export default class Service {
    static getOrderItem(sortBy, sortOrderBy) {
        switch (String(sortBy)) {
            case SortKeys.CustomerWinloss:
                return sortOrderBy === 'desc' ? 4 : 5;
            case SortKeys.Deposit:
                return 1;
            case SortKeys.Withdrawal:
                return 2;
            case SortKeys.TurnOver:
                return 3;
            case SortKeys.OpeningBalance:
                return 6;
            case SortKeys.ClosingBalance:
                return 7;
            default:
                return 0;
        }
    }

    static formatDecimalInObjectNumbers = (obj) => {
        const result = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                if (typeof obj[key] !== 'number' || isNaN(obj[key])) {
                    continue;
                }

                result[key] = NumberFormat.formatHalfDown(obj[key], 2);
            }
        }

        return result;
    };
}
