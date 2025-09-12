import React from 'react';
import { Cell } from '@legion-lib/react-grid';
import NumberFormat from '@/lib/numberFormat';
import { RIGHT_ALIGN, CENTER_ALIGN, LEFT_ALIGN } from '@/constants/gridClasses';

/**
 * Reusable cell components with built-in number formatting to reduce code duplication
 */

const DEFAULT_CELL_CLASS = RIGHT_ALIGN;

/**
 * Cell component that formats numbers using NumberFormat.format()
 * @param {number} value - The numeric value to format
 * @param {string} className - CSS class name (default: RIGHT_ALIGN)
 * @param {object} otherProps - Other props to pass to Cell
 */
export const CountCell = ({ value, className = DEFAULT_CELL_CLASS, ...otherProps }) => (
    <Cell className={className} {...otherProps}>
        {NumberFormat.format(value)}
    </Cell>
);

/**
 * Cell component that formats decimal numbers using NumberFormat.formatDecimal()
 * @param {number} value - The numeric value to format
 * @param {string} className - CSS class name (default: RIGHT_ALIGN)
 * @param {object} otherProps - Other props to pass to Cell
 */
export const DecimalCell = ({ value, className = DEFAULT_CELL_CLASS, ...otherProps }) => (
    <Cell className={className} {...otherProps}>
        {NumberFormat.formatDecimal(value)}
    </Cell>
);

/**
 * Cell component that formats decimal numbers with conditional negative styling
 * @param {number} value - The numeric value to format
 * @param {string} className - Base CSS class name (default: RIGHT_ALIGN)
 * @param {object} otherProps - Other props to pass to Cell
 */
export const ConditionalDecimalCell = ({ value, className = DEFAULT_CELL_CLASS, ...otherProps }) => (
    <Cell className={`${className} ${value < 0 ? 'negative' : ''}`} {...otherProps}>
        {NumberFormat.formatDecimal(value)}
    </Cell>
);

/**
 * Cell component for center-aligned content
 * @param {any} children - The content to display
 * @param {object} otherProps - Other props to pass to Cell
 */
export const CenterAlignedCell = ({ children, ...otherProps }) => (
    <Cell className={CENTER_ALIGN} {...otherProps}>
        {children}
    </Cell>
);

/**
 * Cell component for left-aligned content
 * @param {any} children - The content to display
 * @param {object} otherProps - Other props to pass to Cell
 */
export const LeftAlignedCell = ({ children, ...otherProps }) => (
    <Cell className={LEFT_ALIGN} {...otherProps}>
        {children}
    </Cell>
);

/**
 * Cell component for right-aligned content
 * @param {any} children - The content to display
 * @param {object} otherProps - Other props to pass to Cell
 */
export const RightAlignedCell = ({ children, ...otherProps }) => (
    <Cell className={RIGHT_ALIGN} {...otherProps}>
        {children}
    </Cell>
);

/**
 * Combined component for common financial data cells
 * @param {object} data - Object containing financial values
 * @param {number} data.playerCount - Player count (formatted as count)
 * @param {number} data.betCount - Bet count (formatted as count)
 * @param {number} data.turnOver - Turnover amount (formatted as decimal)
 * @param {number} data.customerWL - Customer win/loss (formatted as decimal)
 * @param {number} data.licenseeWL - Licensee win/loss (formatted as conditional decimal)
 */
export const FinancialDataCells = ({ data }) => {
    const { playerCount, betCount, turnOver, customerWL, licenseeWL } = data;

    return (
        <>
            {playerCount !== undefined && <CountCell value={playerCount} />}
            <CountCell value={betCount} />
            <DecimalCell value={turnOver} />
            <DecimalCell value={customerWL} />
            <ConditionalDecimalCell value={licenseeWL} />
        </>
    );
};
