import { constants } from '.';

export default class Service {
    static getOrderItem(sortKey) {
        switch (sortKey) {
            case constants.SortKeys.SystemId:
                return 1;
            case constants.SortKeys.PendingFunds:
                return 2;
            case constants.SortKeys.BetCount:
                return 3;
            case constants.SortKeys.ExternalId:
                return 4;
        }
    }

    static isAscSort(sortOrder) {
        return sortOrder == 'asc';
    }
}
