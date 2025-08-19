import React from 'react';
import LangHelper from '@/helpers/langHelper';
import { parseFormattedText } from '../../lib/textHelper';

const FormatRule = () => (
    <div className="alert-format-rule">
        <p className="format-title">
            <strong>{LangHelper.getSingleResource('Format')}:</strong>
        </p>
        <div className="format-rule-sample">
            <p>{parseFormattedText(LangHelper.getSingleResource('AlertRuleTxt1'))}</p>
            <p>{parseFormattedText(LangHelper.getSingleResource('AlertRuleTxt2'))}</p>
            <p>{parseFormattedText(LangHelper.getSingleResource('AlertRuleTxt3'))}</p>
            <p>{parseFormattedText(LangHelper.getSingleResource('AlertRuleTxt4'))}</p>
        </div>
    </div>
);

export default FormatRule;
