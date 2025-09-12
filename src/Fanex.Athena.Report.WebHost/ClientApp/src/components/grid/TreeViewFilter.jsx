import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TreeViewSelect } from '@legion-lib/react-multiselect';

import { TreeViewOption } from '@/constants/report';
import LangHelper from '@/helpers/langHelper';

export const TreeViewFilter = props => {
    const { dataSource, onChange, isValid, id, labelKey } = props;

    const _renderSelectList = () => {
        if (!dataSource || !dataSource.length) {
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id={id}
                    dataSource={[]}
                    keyField="value"
                    valueField="name"
                    statusField="checked"
                    texts={{ All: LangHelper.getSingleResource('N_A') }}
                    isAllTextShown={true}
                    hasSearchBox={true}
                    treeViewOption={TreeViewOption}
                    isValid={false}
                />
            );
        }

        return (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id={id}
                dataSource={dataSource}
                keyField="value"
                valueField="name"
                statusField="checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={onChange}
                isValid={isValid}
            />
        );
    };

    return (
        <div className="form-group">
            <label className="label-text">{LangHelper.getSingleResource(labelKey)}</label>
            {_renderSelectList()}
        </div>
    );
};

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    dataSource: PropTypes.array,
    id: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
};

const defaultProps = {
    isValid: true,
    dataSource: [],
};

TreeViewFilter.propTypes = propTypes;
TreeViewFilter.defaultProps = defaultProps;

export default memo(TreeViewFilter);
