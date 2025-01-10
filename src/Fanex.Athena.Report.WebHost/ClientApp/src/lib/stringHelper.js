export default class StringHelper {
    static isEmptyOrWhiteSpace(str) {
        return !str || str.trim().length === 0;
    }

    static addSpaceAfterComma = (str) => {
        return str.split(',').join(', ');
    };
}
