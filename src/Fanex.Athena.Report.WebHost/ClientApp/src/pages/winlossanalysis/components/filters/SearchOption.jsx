import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { DrowdownRadioList } from '@/components/dropdown';
import LangHelper from '@/helpers/langHelper';

import { SearchMode } from '../../common/constants';

const SearchOption = props => {
    const { value, onChange } = props;
    const dataSource = [
        {
            id: SearchMode.MatchPrecise,
            text: LangHelper.getSingleResource('MatchPrecise'),
        },
        {
            id: SearchMode.MatchPrefix,
            text: `${LangHelper.getSingleResource('MatchPrefix')} "<span class='keyword'>test</span>"ABCD`,
        },
        {
            id: SearchMode.MatchCase,
            text: `${LangHelper.getSingleResource('MatchCase')} AB"<span class='keyword'>test</span>"CD`,
        },
    ];
    return (
        <DrowdownRadioList
            id="search-user-name"
            dataSource={dataSource}
            selectedValue={value}
            onChange={onChange}
            className="search-option"
            keySelector="id"
            valueSelector="text"
        />
    );
};

const propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

SearchOption.propTypes = propTypes;

export default memo(SearchOption);
