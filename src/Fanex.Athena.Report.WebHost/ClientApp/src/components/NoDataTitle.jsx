import React from 'react';
import langHelper from '@/helpers/langHelper';

const NoDataTitle = ({ title }) => (
    <p
        className="no-info-row center-align"
        dangerouslySetInnerHTML={{
            __html: title ? title : langHelper.getSingleResource('NoInfo'),
        }}></p>
);

export default NoDataTitle;
