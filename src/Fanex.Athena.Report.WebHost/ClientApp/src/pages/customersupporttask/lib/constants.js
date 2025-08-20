import { decode } from '@/lib/htmlHelper';
import LangHelper from '@/helpers/langHelper';

export const SupportTaskOptions = [
    {
        value: 1,
        label: decode(LangHelper.getSingleResource('GetAllCustomersHavingPositiveClosingBalance')),
    },
    {
        value: 2,
        label: LangHelper.getSingleResource('GetAllCustomersHavingRunningTickets'),
    },
    { value: 3, label: LangHelper.getSingleResource('GetAllRunningTickets') },
];

export const ExportUrl = 'Api/CustomerSupportTask/ExportExcel';
export const ExportFileName = 'CustomerSupportTask.zip';
