import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import { Breadcrumb } from '@legion-lib/react-breadcrumb';
import { Table } from '@legion-lib/react-grid';
import { renderHeader, renderDataSection } from '../common/gridUtils';
import NoDataTitle from '@/components/NoDataTitle';
import { BreadcrumbItems, ReportLevel, ApiUrl } from '../common/constants';
import ReportTitle from '@/components/ReportTitle';

export const DataGrid = props => {
    const { data, total } = props.reportData;

    if (!data) {
        return null;
    }

    if (!data.length) {
        return <NoDataTitle />;
    }

    const { pagingOption, AppData, requestParam } = props;

    const contentData = data.map(item => {
        if (!item.detail) {
            return item;
        }

        // Level 1
        item.detail = item.detail.map(rows => {
            let currency = AppData.currencyList.find(x => x.key === rows.currency);
            currency && (rows.currencyName = currency.value);
            if (!rows.detail || !rows.detail.data) {
                return rows;
            }

            // Level 2
            rows.detail.data = rows.detail.data.map(cells => {
                currency = AppData.currencyList.find(x => x.key === cells.currency);
                currency && (cells.currencyName = currency.value);
                return cells;
            });

            return rows;
        });

        return item;
    });

    const drillDownData = level => {
        const currentLevel = requestParam.DrillDownLevel;

        if (currentLevel === level || level < ReportLevel.MAIN || level > ReportLevel.BETTYPE) {
            return;
        }

        props.toggleLoader(true);
        const newRequestParam = props.breadcrumbParams[level];
        const newBreadcrumbs = props.breadcrumbParams.slice(0, level + 1);

        props.setRequestParam(newRequestParam);
        props.getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
        props.setBreadcrumbParams(newBreadcrumbs);
    };

    return (
        <div className="result-content">
            <Breadcrumb items={BreadcrumbItems} value={requestParam.DrillDownLevel} onChange={item => drillDownData(item.value)} />
            <ReportTitle content={props.reportTitle} />
            <Table
                key={`table-${requestParam.DrillDownLevel}-${props.reloadReport}`}
                minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={renderHeader(requestParam.DrillDownLevel)}
                body={renderDataSection(contentData, requestParam.DrillDownLevel, false)}
                footer={renderDataSection([total], requestParam.DrillDownLevel, true)}
                containerPadding={30}
                onSort={(sortBy, sortOrder) => props.setRequestParam({ ...requestParam, sortBy, sortOrder })}
                isPaging={true}
                pageOption={pagingOption}
                shouldResetScrollPosition={props.reloadReport}
                onPaging={(pageIndex, pageSize) => props.setRequestParam({ ...requestParam, pageSize, pageIndex })}
            />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    const { setRequestParam, toggleLoader, getReportData, setReportTitle, setBreadcrumbParams } = ActionCreators;
    return bindActionCreators({ setRequestParam, toggleLoader, getReportData, setReportTitle, setBreadcrumbParams }, dispatch);
}
function mapStateToProps(state) {
    const { formData, requestParam, pagingOption, reportData, reportTitle, reloadReport, breadcrumbParams } = state;
    return Object.assign({}, { AppData: formData, requestParam, pagingOption, reportData, reportTitle, reloadReport, breadcrumbParams });
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
