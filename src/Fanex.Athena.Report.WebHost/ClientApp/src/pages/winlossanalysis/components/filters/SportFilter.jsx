import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { TreeViewSelect } from '@legion-lib/react-multiselect';

import LangHelper from '@/helpers/langHelper';
import { TreeViewOption } from '@/constants/report';

export const SportFilter = (props) => {
    const { dataSource, onChange, isValid } = props;

    const _renderSportSelectList = () => {
        if (!dataSource || !dataSource.length) {
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="SportList"
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
                id="SportList"
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
            <label className="label-text">{LangHelper.getSingleResource('Sport')}</label>
            {_renderSportSelectList()}
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

SportFilter.propTypes = propTypes;
SportFilter.defaultProps = defaultProps;

export default memo(SportFilter);
