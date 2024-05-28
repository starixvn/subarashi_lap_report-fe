import LangHelper from '@srcRoot/helpers/langHelper';
import * as ReportConstant from '@srcRoot/constants/report';

export const ReportByValue = {
    Monthly: 2,
    Daily: 1,
};

export const TicketFilterValue = {
    All: 0,
    Won: 1,
    Lost: 2,
    Draw: 3,
};

export const TicketFilterOptionAll = { value: TicketFilterValue.All, label: LangHelper.getSingleResource('All') };

export const TicketFilterOptions = [
    { value: TicketFilterValue.Won, label: LangHelper.getSingleResource('Won') },
    { value: TicketFilterValue.Lost, label: LangHelper.getSingleResource('Lost') },
    { value: TicketFilterValue.Draw, label: LangHelper.getSingleResource('Draw') },
];

export const DefaultPagingOption = {
    PageIndex: 1,
    PageSize: 25,
    TotalItem: 25,
    PageList: [25],
};

export const TreeViewOption = {
    ...ReportConstant.TreeViewOption,
    includeSelectedParentKey: true,
};

export const MAX_ODDS_DIGITS = '4';

export const CHILD_ID_PREFIX = 'childId-';
