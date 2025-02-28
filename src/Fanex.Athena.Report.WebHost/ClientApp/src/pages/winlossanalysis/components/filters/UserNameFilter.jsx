import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LangHelper from '@/helpers/langHelper';
import AutoComplete from '@/components/auto-complete';
import SearchOption from './SearchOption';
import { ApiUrl } from '../../common/constants';

const UserNameFilter = (props) => {
    const { onChangeSearchMode, onChangeUserName, searchMode } = props;

    return (
        <div className="form-group">
            <label className="label-text">
                <span>{LangHelper.getSingleResource('Username')}</span>
                <div className="search-option-container">
                    <SearchOption value={searchMode} onChange={onChangeSearchMode} />
                </div>
            </label>
            <AutoComplete
                url={ApiUrl.CUSTOMER_SEARCH_URL}
                onSelect={onChangeUserName}
                onInput={onChangeUserName}
                htmlAttributes={{
                    placeholder: LangHelper.getSingleResource('ExternalIdOrSystemId'),
                }}
            />
        </div>
    );
};

const propTypes = {
    onChangeSearchMode: PropTypes.func,
    onChangeUserName: PropTypes.func,
    searchMode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

UserNameFilter.propTypes = propTypes;

export default memo(UserNameFilter);
