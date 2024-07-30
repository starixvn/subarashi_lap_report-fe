export default class ArrayHelper {
    static ObjectComparator(prevItem, nextItem, sortOrderBy, getValue) {
        if (getValue(prevItem) == getValue(nextItem)) {
            return 0;
        }

        if (sortOrderBy == 'asc') {
            return getValue(prevItem) > getValue(nextItem) ? 1 : -1;
        }

        return getValue(prevItem) < getValue(nextItem) ? 1 : -1;
    }
}
