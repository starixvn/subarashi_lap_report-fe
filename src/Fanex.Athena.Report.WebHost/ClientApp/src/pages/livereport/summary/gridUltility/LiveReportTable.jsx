import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@legion-lib/react-grid';

const LiveReportTable = props => {
    const { tableTitle, header, body, footer } = props;

    return (
        <div className="panel-body">
            <div className="table-title">{tableTitle}</div>
            <Table autoWidth={true} autoHeight={false} bodyHeight="100%" isIncludeScrollWidth={false} header={header} body={body} footer={footer} />
        </div>
    );
};

LiveReportTable.propTypes = {
    tableTitle: PropTypes.string.isRequired,
    header: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    body: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
    footer: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
};

LiveReportTable.defaultProps = {
    header: [],
    body: [],
    footer: [],
};

export default React.memo(LiveReportTable);
