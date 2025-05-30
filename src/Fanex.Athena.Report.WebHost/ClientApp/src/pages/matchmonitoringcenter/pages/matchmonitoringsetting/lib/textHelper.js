import React from 'react';
import NumberFormat from '@/lib/numberFormat';
import LangHelper from '@/helpers/langHelper';

export const parseFormattedText = (text) => {
    if (!text) return null;

    const regex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        parts.push(<strong key={match.index}>{match[1]}</strong>);

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

export const buildConfirmMessage = (item, templateString) => {
    if (!item || !templateString) return '';

    const alertRule = item.alertRule || {};
    const negativeProfit = alertRule.negativeProfit !== undefined ? NumberFormat.formatDecimal(parseFloat(alertRule.negativeProfit)) : '';
    const placeholders = {
        '{0}': item.settingName || '',
        '{1}': negativeProfit,
        '{2}': item.baseCurrency || '',
        '{3}': LangHelper.getSingleResource(item.conditionTypeName) || '',
        '{4}': alertRule.betRatio !== undefined ? alertRule.betRatio : '',
        '{5}': item.notificationInterval !== undefined ? item.notificationInterval : '',
    };

    let result = templateString;
    Object.entries(placeholders).forEach(([placeholder, value]) => {
        const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = result.replace(new RegExp(escapedPlaceholder, 'g'), value);
    });

    return result;
};
