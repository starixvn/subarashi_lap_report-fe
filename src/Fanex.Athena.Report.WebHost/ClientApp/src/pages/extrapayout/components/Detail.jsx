import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table } from '@legion-lib/react-grid';

import { toggleLoader } from '@/actions/loaderAction';
import BetListPopupLayout from '@/components/BetListPopupLayout';
import NoDataTitle from '@/components/NoDataTitle';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import ExportExcel from '@/components/ExportExcel';
import { ApiUrl } from '../common/constants';
import { renderDetailDataSection, renderDetailFooter, renderDetailHeader } from '../common/gridUtils';

export const Detail = (props) => {
    const { title, data, param, toggleLoader } = props;

    const exportDetailExcel = () => {
        if (!param) {
            return;
        }

        const exportRequestParam = {
            ...param,
        };

        toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DETAIL_DATA_URL, exportRequestParam)
            .then((response) => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    const fileName = 'PromotionDetails.xls';
                    Site.downloadFile(response.data, fileName);
                }
                toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                toggleLoader(false);
            });
    };

    const betListTitle = (
        <p>
            {title}
            <ExportExcel onClick={exportDetailExcel} />
        </p>
    );

    return (
        <div>
            <BetListPopupLayout title={betListTitle}>
                {data && data.data.length ? (
                    <Table
                        autoWidth={false}
                        autoHeight={false}
                        width={980}
                        bodyHeight={430}
                        header={renderDetailHeader()}
                        body={renderDetailDataSection(data.data)}
                        footer={renderDetailFooter(data)}
                    />
                ) : (
                    <NoDataTitle />
                )}
            </BetListPopupLayout>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
