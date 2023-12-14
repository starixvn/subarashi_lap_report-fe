import moment from 'moment';

export const FirstDayOfWeek = 1;

const now = moment().utc().add(-4, 'h');
const toDate = now.clone().add(-1, 'd');
const fromDate = toDate.clone().weekday(FirstDayOfWeek);

export const DateConstraint = {
    minDate: '05/31/2012',
    maxDate: now.clone().add(-1, 'd').format('MM/DD/yyyy'),
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 2,
};

export const DateRange = {
    fromDate: fromDate > toDate ? fromDate.add(-7, 'd').format('MM/DD/yyyy') : fromDate.format('MM/DD/yyyy'),
    toDate: toDate.format('MM/DD/yyyy'),
};
