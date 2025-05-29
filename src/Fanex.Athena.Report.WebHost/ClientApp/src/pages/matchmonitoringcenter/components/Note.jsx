import React, { memo } from 'react';
import LangHelper from '@/helpers/langHelper';

export const Note = (props) => {
    return (
        <>
            <div className="col-12 col-md-3 col-xl-1 note text-bold">{LangHelper.getSingleResource('Note')}:</div>
            <div>
                - {LangHelper.getSingleResource('MatchMonitoringCenter_Note')}
                <br />- {LangHelper.getSingleResource('MatchMonitoringCenter_Note2')}
            </div>
        </>
    );
};

export default memo(Note);
