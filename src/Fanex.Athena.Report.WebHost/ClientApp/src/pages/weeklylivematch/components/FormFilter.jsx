import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DateRange } from '@srcRoot/components/date-range';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import LangHelper from "@srcRoot/helpers/langHelper";
import { ActionCreators } from '../actions';
import moment from "moment";
import DataService from '@srcRoot/lib/DataService';
import Site from '@srcRoot/lib/site';
import { ApiUrl } from '../constants/apiUrl';

const FormFilter = (props) => {
    const dateConstraint = { minDate: '01/01/2012', maxDate: moment().add(-1, 'd').format("MM/DD/yyyy"), limitedMonthRange: null };

    const isValidModel = () => {
        const result = true;
        return result;
    }

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", dateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateFilter = () => {
        return (
            <DateRange
                startDate={props.dateRange.fromDate} endDate={props.dateRange.toDate}
                minDate={dateConstraint.minDate} maxDate={dateConstraint.maxDate}
                today={props.dateRange.toDate} limitedMonthRange={dateConstraint.limitedMonthRange}
                onChange={_onChangeDateRange}
            />
        )
    }

    const _renderSupportButton = () => {
        return (<div></div>);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        props.toggleLoader(true);

        const params = _getParams();
        DataService.postReportData(ApiUrl.REPORT_DATA_URL, params)
            .then(response => {
                props.toggleLoader(false);
            })
            .catch(error => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                props.toggleLoader(false);
            })
    }

    const _getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        return {
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
        };
    }

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={_renderSupportButton()}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        {_renderDateFilter()}
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel()} className="btn btn-submit" onClick={onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
}

function mapStateToProps(state) {
    const { dateRange } = state;

    return Object.assign({}, { dateRange });
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader, setDateRange } = ActionCreators;
    return bindActionCreators({ toggleLoader, setDateRange }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);