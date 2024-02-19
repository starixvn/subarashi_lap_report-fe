import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { ExportExcelMode } from '../common/constants';
import Service from '../common/Service';
import Popup from '@srcRoot/components/Popup';
import RadioGroup from '@srcRoot/components/RadioGroup';
import LangHelper from '@srcRoot/helpers/langHelper';
import { decode } from '@srcRoot/lib/htmlHelper';
import { v4 as uuidv4 } from 'uuid';
import { memo } from 'react';

export const ExcelPopUp = () => {
    const [isShow, setIsShow] = useState(false);
    const requestParam = useSelector((state) => state.requestParam);
    const { toggleLoader } = ActionCreators;
    const dispatch = useDispatch();
    const [exportExcelMode, setExportExcelMode] = useState(ExportExcelMode.All);
    const options = [
        { label: decode(LangHelper.getSingleResource('BothGroupByAndBreakdownLevelOption')), value: ExportExcelMode.All },
        { label: decode(LangHelper.getSingleResource('GroupByLevelOnlyOption')), value: ExportExcelMode.GroupByLevelOnly },
    ];

    const _onclickHandler = () => {
        setIsShow(true);
    };

    const _onCloseHandler = () => {
        setIsShow(false);
        setExportExcelMode(ExportExcelMode.All);
    };

    const _onChangeExcelModeHandler = (value) => {
        setExportExcelMode(value);
    };

    const _onExportExcelHandler = (event) => {
        event.preventDefault();
        const params = { ...requestParam, ExportExcelMode: exportExcelMode, PageSize: 0, PageIndex: 0 };
        dispatch(toggleLoader(true));
        Service.getFile(params).then(() => {
            _onCloseHandler();
            dispatch(toggleLoader(false));
        });
    };

    return (
        <>
            <span className="flex-initial icon icon-excel-white" onClick={_onclickHandler}></span>
            <Popup
                className="excel-popup-container"
                isShow={isShow}
                title={LangHelper.getSingleResource('Confirmation')}
                onClose={_onCloseHandler}
                isHtml={false}>
                <div className="excel-popup-content">
                    <RadioGroup
                        key={`${uuidv4()}`}
                        label={LangHelper.getSingleResource('ChooseDataDisplayInExcelMsg')}
                        className="excel-option"
                        name="excel-option"
                        options={options}
                        value={exportExcelMode}
                        onChange={_onChangeExcelModeHandler}
                    />

                    <div className="button-group right-align">
                        <button className="btn btn-submit" onClick={_onExportExcelHandler}>
                            {LangHelper.getSingleResource('OK')}
                        </button>
                        <button className="btn btn-cancel" onClick={_onCloseHandler}>
                            {LangHelper.getSingleResource('Cancel')}
                        </button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

export default memo(ExcelPopUp);
