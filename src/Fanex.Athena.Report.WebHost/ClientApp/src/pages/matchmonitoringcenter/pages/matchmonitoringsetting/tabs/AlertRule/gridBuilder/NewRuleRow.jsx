import React, { useState, useCallback } from 'react';
import { Row, Cell } from '@legion-lib/react-grid';
import { useDispatch, useSelector } from 'react-redux';
import DropdownCell from '../customGrid/DropdownCell';
import ActionCell from '../customGrid/ActionCell';
import InputCell from '../customGrid/InputCell';
import { InputType, conditions, notifyEverys, defaultNotifyEvery, defaultCondition } from '../../../lib/constants';
import ActionCreators from '../../../actions';
import LangHelper from '@/helpers/langHelper';
import { buildConfirmMessage } from '../../../lib/textHelper';

import {
    handleCellChangeValue,
    closeAlert,
    buildAlertOptionForMissingFields,
    validateAlertRuleItem,
    buildConfirmAlertOption,
    createAlertRule,
} from '../../../lib/service';

const NewRuleRow = ({ baseCurrencyList, defaultBaseCurrency, setAddNewRule, onDataChanged, monitoringID: propMonitoringID }) => {
    const { setSweetAlertOption } = ActionCreators;
    const [isEdited, setIsEdited] = useState(true);
    const dispatch = useDispatch();
    const stateMonitoringID = useSelector((state) => state.monitoringID);
    const monitoringID = propMonitoringID || stateMonitoringID;

    const [newItem, setNewItem] = useState({
        settingName: '',
        baseCurrency: defaultBaseCurrency || (baseCurrencyList?.length > 0 ? baseCurrencyList[0].value : ''),
        conditionTypeName: defaultCondition,
        notificationInterval: defaultNotifyEvery,
        alertRule: {
            negativeProfit: '',
            betRatio: '',
        },
    });

    const handleCellChange = useCallback((fieldKey, value) => {
        handleCellChangeValue(setNewItem, fieldKey, value);
    }, []);

    const handleCloseAlert = useCallback(() => {
        closeAlert(dispatch);
    }, [dispatch]);

    const cancelProps = {
        onClick: handleCloseAlert,
    };

    const handleCancelAddNew = useCallback(() => {
        dispatch(setAddNewRule(false));
    }, [dispatch, setAddNewRule]);

    const createCancelConfirmProps = useCallback(
        () => ({
            onClick: () => {
                handleCloseAlert();
                handleCancelAddNew();
            },
        }),
        [handleCancelAddNew, handleCloseAlert]
    );

    const buildAlertOptionDelete = useCallback(() => {
        return buildConfirmAlertOption(
            newItem,
            'DeleteAlterRuleConfirmationMsg',
            buildConfirmMessage,
            handleCloseAlert,
            createCancelConfirmProps(),
            cancelProps
        );
    }, [newItem, handleCloseAlert, createCancelConfirmProps, cancelProps]);

    const handleCreateItem = useCallback(async () => {
        await createAlertRule(newItem, monitoringID, dispatch, setAddNewRule, onDataChanged);
    }, [newItem, monitoringID, dispatch, setAddNewRule, onDataChanged]);

    const createConfirmProps = useCallback(
        () => ({
            onClick: async () => {
                handleCloseAlert();
                await handleCreateItem();
            },
        }),
        [handleCreateItem, handleCloseAlert]
    );

    const buildAlertOptionCreate = useCallback(() => {
        return buildConfirmAlertOption(newItem, 'CreateAlertRuleConfirmationMsg', buildConfirmMessage, handleCloseAlert, createConfirmProps(), cancelProps);
    }, [newItem, handleCloseAlert, createConfirmProps, cancelProps]);

    const buildAlertOption = useCallback(() => {
        return buildAlertOptionForMissingFields(handleCloseAlert);
    }, [handleCloseAlert]);

    const handleSaveClick = useCallback(
        async (event) => {
            event.preventDefault();
            if (!validateAlertRuleItem(newItem)) {
                const alertOption = buildAlertOption();
                dispatch(setSweetAlertOption(alertOption));
                return;
            }

            const alertOption = buildAlertOptionCreate();
            dispatch(setSweetAlertOption(alertOption));
        },
        [newItem, dispatch, buildAlertOption, buildAlertOptionCreate]
    );

    const handleCloseClick = useCallback(
        (event) => {
            event.preventDefault();
            handleCancelAddNew();
        },
        [handleCancelAddNew]
    );

    return (
        <Row key="new-alert-rule">
            <Cell className="left-align">
                <InputCell value={newItem.settingName} fieldKey="settingName" onChange={handleCellChange} />
            </Cell>
            <Cell className="left-align">
                <InputCell
                    value={newItem.alertRule.negativeProfit}
                    fieldKey="negativeProfit"
                    onChange={handleCellChange}
                    type={InputType.number}
                    min={0}
                />
            </Cell>
            <Cell className="left-align">
                <DropdownCell value={newItem.baseCurrency} fieldKey="baseCurrency" dataSource={baseCurrencyList} onChange={handleCellChange} />
            </Cell>
            <Cell className="left-align">
                <DropdownCell value={LangHelper.getSingleResource(newItem.conditionTypeName)} fieldKey="conditionTypeName" dataSource={conditions} onChange={handleCellChange} />
            </Cell>
            <Cell className="left-align">
                <InputCell
                    value={newItem.alertRule.betRatio}
                    fieldKey="betRatio"
                    onChange={handleCellChange}
                    type={InputType.number}
                    width="70%"
                    min={0}
                    max={100}
                /> %
            </Cell>
            <Cell className="left-align">
                <DropdownCell
                    value={newItem.notificationInterval}
                    fieldKey="notificationInterval"
                    dataSource={notifyEverys}
                    onChange={handleCellChange}
                    width="50%"
                />{' '}
                {LangHelper.getSingleResource('seconds')}
            </Cell>

            <Cell className="center-align">
                <ActionCell isEdited={isEdited} onSaveClick={handleSaveClick} onCloseClick={handleCloseClick} />
            </Cell>
        </Row>
    );
};

export default React.memo(NewRuleRow);
