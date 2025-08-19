import React, { useState, useEffect, useCallback } from 'react';
import { Row, Cell } from '@legion-lib/react-grid';
import { useDispatch } from 'react-redux';
import ActionCreators from '../../../actions';
import LangHelper from '@/helpers/langHelper';
import { buildConfirmMessage } from '../../../lib/textHelper';
import ActionCell from '../customGrid/ActionCell';
import DropdownCell from '../customGrid/DropdownCell';
import { InputType, conditions, notifyEverys, defaultNotifyEvery, defaultCondition } from '../../../lib/constants';
import NumberFormat from '@/lib/numberFormat';
import InputCell from '../customGrid/InputCell';
import {
    handleCellChangeValue,
    closeAlert,
    buildAlertOptionForMissingFields,
    validateAlertRuleItem,
    buildConfirmAlertOption,
    updateAlertRule,
    deleteAlertRule,
} from '../../../lib/service';

const getFormattedNotificationInterval = interval => {
    if (interval === undefined) {
        return '';
    }

    const notifyEveryOption = notifyEverys.find(n => n.key === interval);
    return notifyEveryOption?.displayValue || interval.toString();
};

const DataRow = ({ item: initialItem, baseCurrencyList, defaultBaseCurrency, onDataChanged }) => {
    const { setSweetAlertOption } = ActionCreators;
    const [isEdited, setIsEdited] = useState(false);
    const [item, setItem] = useState(initialItem);
    const dispatch = useDispatch();

    useEffect(() => {
        setItem(initialItem);
    }, [initialItem]);

    const handleToggleEdit = useCallback(editState => {
        setIsEdited(editState);
    }, []);

    const handleCellChange = useCallback((key, value) => {
        handleCellChangeValue(setItem, key, value);
    }, []);

    const hasChanges = useCallback(() => {
        if (!item || !initialItem) {
            return false;
        }

        const topLevelKeys = Object.keys(item).filter(key => key !== 'alertRule');
        for (const key of topLevelKeys) {
            if (item[key] !== initialItem[key]) {
                return true;
            }
        }

        const itemAlertRule = item.alertRule || {};
        const initialAlertRule = initialItem.alertRule || {};
        const alertRuleKeys = Object.keys({ ...itemAlertRule, ...initialAlertRule });

        for (const key of alertRuleKeys) {
            if (itemAlertRule[key] !== initialAlertRule[key]) {
                return true;
            }
        }

        return false;
    }, [item, initialItem]);

    const handleCloseAlert = useCallback(() => {
        closeAlert(dispatch);
    }, [dispatch]);

    const cancelProps = {
        onClick: handleCloseAlert,
    };

    const handleApplyChange = useCallback(async () => {
        await updateAlertRule(item, dispatch, setIsEdited, onDataChanged);
    }, [item, dispatch, onDataChanged]);

    const handleDeleteItem = useCallback(async () => {
        await deleteAlertRule(item, dispatch, setIsEdited, onDataChanged);
    }, [item, dispatch, onDataChanged]);

    const createApplyChangeConfirmProps = useCallback(
        () => ({
            onClick: async () => {
                await handleApplyChange();
            },
        }),
        [handleApplyChange]
    );

    const createDeleteConfirmProps = useCallback(
        () => ({
            onClick: async () => {
                await handleDeleteItem();
            },
        }),
        [handleDeleteItem]
    );

    const buildAlertOptionApplyChange = useCallback(
        () =>
            buildConfirmAlertOption(
                item,
                'UpdateAlterRuleConfirmationMsg',
                buildConfirmMessage,
                handleCloseAlert,
                createApplyChangeConfirmProps(),
                cancelProps
            ),
        [item, handleCloseAlert, createApplyChangeConfirmProps, cancelProps]
    );

    const buildAlertOptionDelete = useCallback(
        () => buildConfirmAlertOption(item, 'DeleteAlterRuleConfirmationMsg', buildConfirmMessage, handleCloseAlert, createDeleteConfirmProps(), cancelProps),
        [item, handleCloseAlert, createDeleteConfirmProps, cancelProps]
    );

    const buildAlertOption = useCallback(() => buildAlertOptionForMissingFields(handleCloseAlert), [handleCloseAlert]);

    const handleSaveClick = useCallback(
        event => {
            event.preventDefault();

            if (!validateAlertRuleItem(item)) {
                const alertOption = buildAlertOption();
                dispatch(setSweetAlertOption(alertOption));
                return;
            }

            if (!hasChanges()) {
                setIsEdited(false);
                return;
            }
            const alertOption = buildAlertOptionApplyChange();
            dispatch(setSweetAlertOption(alertOption));
        },
        [item, hasChanges, buildAlertOption, buildAlertOptionApplyChange, dispatch]
    );

    const handleEditClick = useCallback(
        event => {
            event.preventDefault();
            handleToggleEdit(true);
        },
        [handleToggleEdit]
    );

    const handleCloseClick = useCallback(
        event => {
            event.preventDefault();
            const alertOption = buildAlertOptionDelete();
            dispatch(setSweetAlertOption(alertOption));
        },
        [buildAlertOptionDelete, dispatch]
    );

    return (
        <Row>
            {!isEdited ? (
                <>
                    <Cell className="left-align">{item.settingName}</Cell>
                    <Cell className="left-align">{NumberFormat.formatDecimal(item.alertRule?.negativeProfit)}</Cell>
                    <Cell className="left-align">{item.baseCurrency}</Cell>
                    <Cell className="left-align">{LangHelper.getSingleResource(item.conditionTypeName)}</Cell>
                    <Cell className="left-align">{item.alertRule?.betRatio}%</Cell>
                    <Cell className="left-align">{getFormattedNotificationInterval(item.notificationInterval)}</Cell>
                    <Cell className="center-align">
                        <ActionCell isEdited={isEdited} onEditClick={handleEditClick} onCloseClick={handleCloseClick} />
                    </Cell>
                </>
            ) : (
                <>
                    <Cell className="left-align">
                        <InputCell value={item.settingName} fieldKey="settingName" onChange={handleCellChange} max={50} />
                    </Cell>
                    <Cell className="left-align">
                        <InputCell
                            value={item.alertRule?.negativeProfit}
                            fieldKey="negativeProfit"
                            onChange={handleCellChange}
                            type={InputType.number}
                            min={0}
                        />
                    </Cell>
                    <Cell className="left-align">
                        <DropdownCell
                            value={item.baseCurrency || defaultBaseCurrency}
                            fieldKey="baseCurrency"
                            dataSource={baseCurrencyList}
                            onChange={handleCellChange}
                        />
                    </Cell>
                    <Cell className="left-align">
                        <DropdownCell
                            value={LangHelper.getSingleResource(item.conditionTypeName) || defaultCondition}
                            fieldKey="conditionTypeName"
                            dataSource={conditions}
                            onChange={handleCellChange}
                        />
                    </Cell>
                    <Cell className="left-align">
                        <InputCell
                            value={item.alertRule?.betRatio}
                            fieldKey="betRatio"
                            onChange={handleCellChange}
                            type={InputType.number}
                            width="70%"
                            min={0}
                            max={100}
                        />{' '}
                        %
                    </Cell>
                    <Cell className="left-align">
                        <DropdownCell
                            value={item.notificationInterval || defaultNotifyEvery}
                            fieldKey="notificationInterval"
                            dataSource={notifyEverys}
                            onChange={handleCellChange}
                        />
                    </Cell>
                    <Cell className="center-align">
                        <ActionCell isEdited={isEdited} onSaveClick={handleSaveClick} onCloseClick={handleCloseClick} />
                    </Cell>
                </>
            )}
        </Row>
    );
};

export default React.memo(DataRow);
