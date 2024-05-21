import React from 'react';
import PropTypes from 'prop-types';

const ReportTitle = ({ content, extendContent, tag, ...attrs }) => {
    const Tag = tag;

    return (
        <div className="report-title-container">
            <Tag className="report-title" {...attrs}>
                {content}
                {extendContent}
            </Tag>
        </div>
    );
};

const propTypes = {
    tag: PropTypes.string,
    content: PropTypes.any,
};

const defaultProps = {
    tag: 'p',
};

ReportTitle.propTypes = propTypes;
ReportTitle.defaultProps = defaultProps;

export default ReportTitle;
