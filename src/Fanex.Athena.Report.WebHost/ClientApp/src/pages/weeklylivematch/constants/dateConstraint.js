import moment from "moment";

export const DateConstraint = {
    minDate: '01/01/2012', 
    maxDate: moment().add(-1, 'd').format("MM/DD/yyyy"), 
    limitedMonthRange: null
};