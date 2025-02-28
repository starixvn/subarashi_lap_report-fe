import moment from 'moment';
import { WeekDays } from '@/constants/config';

export const FirstDayOfWeek = WeekDays.Sunday;

const now = moment().utc().add(-4, 'h');
const toDate = now.clone().add(1, 'd');

export const DateConstraint = {
    minDate: '06/01/2021',
    maxDate: toDate,
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 12,
    firstDayOfWeek: WeekDays.Sunday,
};

export const DateRange = {
    fromDate: now.format('MM/DD/yyyy'),
    toDate: toDate,
};

export const DefaultDateRange = {
    dateRange: {
        fromDate: DateConstraint.today,
        toDate: DateConstraint.today,
    },
};
