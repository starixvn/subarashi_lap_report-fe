import React, { memo } from 'react';
import LangHelper from '@/helpers/langHelper';
import { useSelector } from 'react-redux';

export const Note = () => {
    const [formData] = useSelector(state => [state.formData]);
    return (
        <>
            <div className="col-12 col-md-3 col-xl-1 note text-bold">{LangHelper.getSingleResource('Note')}:</div>
            <div>
                - {LangHelper.getSingleResource('MatchMonitoringCenter_Note')}
                <br />- {LangHelper.getSingleResource('MatchMonitoringCenter_Note2')}
                <br />- {LangHelper.getSingleResource('MatchMonitoringCenter_Note3').replace('{0}', formData.moveBetsDayString)}
            </div>
        </>
    );
};

export default memo(Note);
