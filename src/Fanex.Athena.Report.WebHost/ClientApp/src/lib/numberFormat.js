export default class NumberFormat {
    static formatDecimal(value) {
        return this.format(value, 2);
    }

    static formatDecimalHalfDown(value) {
        return this.formatHalfDown(value, 2);
    }

    static formatInteger(value) {
        if (typeof value !== 'number' || isNaN(value)) {
            return '';
        }

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static format(value, digits = 0) {
        if (typeof value !== 'number' || isNaN(value)) {
            return '';
        }

        const roundedValue = this.round(value, digits);

        return roundedValue.toFixed(digits).replace(/^[+-]?\d+/, (int) => int.replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
    }

    static round(value, digits) {
        const sign = value < 0 ? -1 : 1;
        const absoluteValue = Math.abs(value);
        const rounded = Number(Math.round(absoluteValue + 'e' + digits) + 'e-' + digits);

        return sign * rounded;
    }

    static parseToString(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,');
    }

    static roundDownFormatDecimal(value) {
        return this.roundDownFormat(value, 2);
    }

    static roundDownFormat(value, digits = 0) {
        if (typeof value !== 'number' || isNaN(value)) {
            return '';
        }

        const roundedValue = this.roundDown(value, digits);

        return roundedValue.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,');
    }

    static roundDown(value, digits) {
        const sign = value < 0 ? -1 : 1;
        const absoluteValue = Math.abs(value);
        const rounded = Number(Math.floor(absoluteValue + 'e' + digits) + 'e-' + digits);

        return sign * rounded;
    }

    static formatHalfDown(value, digits = 0) {
        if (typeof value !== 'number' || isNaN(value)) {
            return '';
        }
        const sign = value < 0 ? -1 : 1;
        const absoluteValue = Math.abs(value);

        const power = Math.pow(10, digits || 0);
        const roundedValue = sign * (Math.round(absoluteValue * power) / power);

        return roundedValue.toFixed(digits).replace(/^[+-]?\d+/, (int) => int.replace(/(\d)(?=(\d{3})+$)/g, '$1,'));
    }
}
