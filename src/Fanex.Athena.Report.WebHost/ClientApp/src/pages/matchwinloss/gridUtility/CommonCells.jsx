import React from 'react';
import { useSelector } from 'react-redux';
import { Cell } from '@legion-lib/react-grid';
import NumberFormat from '@srcRoot/lib/numberFormat';

const CommonCells = (props) => {
    const formData = useSelector((state) => state.formData);
    const matchData = props.data;
    return (
        <>
            <Cell className={'right-align'} key={`col-turnover`}>
                {NumberFormat.formatDecimal(NumberFormat.round(matchData.turnover, 2))}
            </Cell>
            <Cell className={'right-align'} key={`col-totalTransaction`}>
                {NumberFormat.format(matchData.totalTransaction)}
            </Cell>
            <Cell className="right-align" key={`col-customerWL`}>
                {NumberFormat.formatDecimal(NumberFormat.round(matchData.customerWL, 2))}
            </Cell>
            {formData.isAllowedCustomerCommission && (
                <>
                    <Cell className="right-align" key={`col-customerComm`}>
                        {NumberFormat.formatDecimal(NumberFormat.round(matchData.customerComm, 2))}
                    </Cell>
                    <Cell className="right-align" key={`col-totalWL`}>
                        {NumberFormat.formatDecimal(NumberFormat.round(matchData.customerComm + matchData.customerWL, 2))}
                    </Cell>
                </>
            )}
            <Cell className={`right-align ${matchData.licenseeWL - 0 < 0 ? 'negative' : ''}`} key={`col-licenseeWL`}>
                {NumberFormat.formatDecimal(NumberFormat.round(matchData.licenseeWL, 2))}
            </Cell>
        </>
    );
};

export default CommonCells;
