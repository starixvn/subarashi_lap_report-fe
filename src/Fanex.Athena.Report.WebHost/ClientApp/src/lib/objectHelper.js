export default class ObjectHelper {
    static toCamel(o) {
        let newO;
        if (o instanceof Array) {
            return o.map(function (value) {
                if (typeof value === 'object') {
                    value = ObjectHelper.toCamel(value);
                }
                return value;
            });
        } else {
            newO = ObjectHelper.convertObjectToCamel(o);
        }
        return newO;
    }

    static convertObjectToCamel(o) {
        const newO = {};
        for (const origKey in o) {
            if (Object.prototype.hasOwnProperty.call(o, origKey)) {
                const newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                let value = o[origKey];
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = ObjectHelper.toCamel(value);
                }
                newO[newKey] = value;
            }
        }
        return newO;
    }
}
