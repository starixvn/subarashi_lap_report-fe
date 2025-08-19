import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MobileGroupByRow from './MobileGroupByRow';

export const MobileGroupByRowList = props => {
    const { dataList, selectedDisplayTypeId } = props;
    return dataList.map(item => {
        const parentData = item.keyItem;
        const { rowIndex, groupBy } = parentData;
        return <MobileGroupByRow key={`row-${rowIndex}-${groupBy}`} data={item} selectedDisplayTypeId={selectedDisplayTypeId} />;
    });
};

const propTypes = {
    dataList: PropTypes.array,
    selectedDisplayTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MobileGroupByRowList.propTypes = propTypes;

export default memo(MobileGroupByRowList);
