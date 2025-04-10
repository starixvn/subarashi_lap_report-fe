import LangHelper from '@/helpers/langHelper';

export const SelectTopOptions = [
    { value: 0, label: LangHelper.getSingleResource('All') },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
];

export const ExcludeTestDataOptions = [
    { value: 'true', label: LangHelper.getSingleResource('Yes') },
    { value: 'false', label: LangHelper.getSingleResource('No') },
];

export const SortKeys = {
    OpeningBalance: 'OpeningBalance',
    Deposit: 'Deposit',
    CustomerWinloss: 'CustomerWinloss',
    Withdrawal: 'Withdrawal',
    TurnOver: 'TurnOver',
    ClosingBalance: 'ClosingBalance',
};

export const PopUpSetting = {
    Title: 'LRF-NOTIFICATION',
    Message: 'Please choose at least one of products',
};

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 500,
    TotalItem: 500,
    PageList: [500],
};
