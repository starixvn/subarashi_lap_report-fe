import React from 'react';
import BetListPageTable from '../../../../../../components/grid/BetListPageTable';
import tableSettings from '../constant/tableSettings';

const MatchWinLossTable = props => <BetListPageTable {...props} tableSettings={tableSettings} />;

export default MatchWinLossTable;
