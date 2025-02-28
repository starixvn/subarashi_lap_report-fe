import React, { memo } from 'react';
import LangHelper from '@/helpers/langHelper';

export const Note = (props) => {
    return (
        <>
            <div className="col-12 col-md-3 col-xl-1 note">{LangHelper.getSingleResource('Note')}:</div>
            <div>
                * {LangHelper.getSingleResource('WinlossAnalysis_SettlementTimeModeNote')}
                <br />* {LangHelper.getSingleResource('WinlossAnalysis_SettlementTimeModeNote2')}
            </div>
        </>
    );
};

export default memo(Note);
