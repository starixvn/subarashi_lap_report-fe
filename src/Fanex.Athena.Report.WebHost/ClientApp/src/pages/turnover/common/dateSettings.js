import moment from 'moment';
import LangHelper from '@/helpers/langHelper';

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: '06/1/2012',
    maxDate: now.clone().format('MM/DD/yyyy'),
    showDate: true,
    monthOption: {
        label: LangHelper.getSingleResource('ViewDataInMonth'),
    },
    fromDateOption: {
        label: LangHelper.getSingleResource('From'),
        id: 'FromDateInput',
    },
    toDateOption: {
        label: LangHelper.getSingleResource('To'),
        id: 'ToDateInput',
    },
};

export const DateRange = {
    fromDate: now.clone().startOf('month').format('MM/DD/yyyy'),
    toDate: now.clone().format('MM/DD/yyyy'),
};
