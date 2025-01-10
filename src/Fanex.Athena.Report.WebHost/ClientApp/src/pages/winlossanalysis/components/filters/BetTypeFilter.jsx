import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TreeViewSelect } from '@legion-lib/react-multiselect';

import { TreeViewOption } from '@srcRoot/constants/report';
import LangHelper from '@srcRoot/helpers/langHelper';

export const BetTypeFilter = (props) => {
    const { dataSource, onChange, isValid } = props;

    const _renderBettypeSelectList = () => {
        if (!dataSource || !dataSource.length) {
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="BetTypeList"
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
                id="BetTypeList"
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
            <label className="label-text">{LangHelper.getSingleResource('BetType')}</label>
            {_renderBettypeSelectList()}
        </div>
    );
};

const propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    dataSource: PropTypes.array,
};

const defaultProps = {
    isValid: true,
    dataSource: [],
};

BetTypeFilter.propTypes = propTypes;
BetTypeFilter.defaultProps = defaultProps;

export default memo(BetTypeFilter);
