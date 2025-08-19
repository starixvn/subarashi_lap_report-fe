import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import LangHelper from '@/helpers/langHelper';
import { ActionCreators } from '../actions';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import SubmitButton from '@/components/SubmitButton';

const FormFilter = () => {
    const dispatch = useDispatch();

    const formData = useSelector(state => state.formData);
    const selectedLogTypes = useSelector(state => state.selectedLogTypes || '');
    const selectedActions = useSelector(state => state.selectedActions || '');
    const monitoringID = useSelector(state => state.monitoringID);

    const logTypeOptions = formData?.logTypeOptions || [];
    const actionOptions = formData?.actionOptions || [];

    const onChangeSelectedLogTypes = (_currentItem, selectedItemsKey) => {
        dispatch(ActionCreators.setSelectedLogTypes(selectedItemsKey));
        dispatch(ActionCreators.getActionList(selectedItemsKey));
    };

    const onChangeSelectedActions = (_currentItem, selectedItemsKey) => {
        dispatch(ActionCreators.setSelectedActions(selectedItemsKey));
    };

    const getParams = () => ({
        Actions: selectedActions,
        MonitoringID: monitoringID,
    });

    const onSubmit = event => {
        event.preventDefault();

        const params = getParams();
        dispatch(ActionCreators.fetchLogData(params));
    };

    const isSubmitDisabled = !selectedLogTypes && !selectedActions;

    return (
        <CollapsiblePanel className="light-shadow" isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('LogType')}</label>
                        <MultipleSelect
                            id={'LogTypeList'}
                            language={LangHelper.currentLanguage}
                            dataSource={logTypeOptions}
                            keyField={'key'}
                            valueField={'value'}
                            statusField={'status'}
                            onChange={onChangeSelectedLogTypes}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Action')}</label>
                        <MultipleSelect
                            id={'ActionList'}
                            language={LangHelper.currentLanguage}
                            dataSource={actionOptions}
                            keyField={'key'}
                            valueField={'value'}
                            statusField={'status'}
                            onChange={onChangeSelectedActions}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isSubmitDisabled} onClick={onSubmit}>
                                {LangHelper.getSingleResource('Submit')}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default FormFilter;
