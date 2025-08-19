export default class StringHelper {
    static isEmptyOrWhiteSpace(str) {
        return !str || str.trim().length === 0;
    }

    static addSpaceAfterComma = str => str.split(',').join(', ');
}
