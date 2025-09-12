import React from 'react';
import BetListPageTable from '../../../../../../components/grid/BetListPageTable';
import tableSettings from '../common/tableSettings';

const LiveReportTable = props => <BetListPageTable {...props} tableSettings={tableSettings} />;

export default LiveReportTable;
