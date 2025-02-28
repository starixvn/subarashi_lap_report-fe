import { WeekDays } from '@/constants/config';
import moment from 'moment';

export const FirstDayOfWeek = WeekDays.Sunday;

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: '05/31/2012',
    maxDate: now.clone().format('MM/DD/yyyy'),
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 3,
};

export const DateRange = {
    fromDate: now.format('MM/DD/yyyy'),
    toDate: now.format('MM/DD/yyyy'),
};

export const DefaultDateRange = {
    dateRange: {
        fromDate: DateConstraint.today,
        toDate: DateConstraint.today,
    },
};
