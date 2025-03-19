import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExcelPopUp from '../ExcelPopUp.jsx';
import { useElementSize } from 'usehooks-ts';
import Overlay from '@/components/Overlay.jsx';

export const ReportTitleContent = () => {
    const reportTitle = useSelector((state) => state.reportTitle);
    const [isShowTooltipIcon, setIsShowTooltipIcon] = useState(false);
    const [isShowTooltip, setIsShowTooltip] = useState(false);
    const [setRef, { width }] = useElementSize();
    const titleRef = useRef(null);
    useEffect(() => {
        if (width < titleRef.current?.scrollWidth) {
            setIsShowTooltipIcon(true);
        } else {
            setIsShowTooltipIcon(false);
        }
    }, [width]);

    const _onClick = () => {
        setIsShowTooltip(!isShowTooltip);
    };

    const _setRef = (elem) => {
        titleRef.current = elem;
        setRef(elem);
    };

    return (
        <div className="flex w100 flex-center">
            <span ref={_setRef} className="flex-auto report-title-text">
                {reportTitle}
            </span>
            {isShowTooltipIcon && (
                <>
                    <span className="icon icon-lap-notification flex-initial" onClick={_onClick}></span>
                    <Overlay isOpening={isShowTooltip}>
                        <div className="overlay-title">{reportTitle}</div>
                    </Overlay>
                </>
            )}
            <ExcelPopUp />
        </div>
    );
};

export default ReportTitleContent;
