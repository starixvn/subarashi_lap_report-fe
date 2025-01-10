import NumberFormat from '@srcRoot/lib/numberFormat';

class BetListHelper {
    static loadBetListDataGrid(data, isServerPaging) {
        if (isServerPaging) {
            return this.loadBetlistPagingData(data);
        }
        return this.loadBetListData(data);
    }

    static loadBetListData(data) {
        return {
            rows: data.Main,
            userData: {
                WinLoss: this.roundDecimalToString(data.Total.SumWinLoss),
                LicenseeWL: this.roundDecimalToString(data.Total.SumLicenseeWl),
                BetEffective: this.roundDecimalToString(data.Total.SumBetEffective),
                Stake: this.roundDecimalToString(data.Total.SumStake),
            },
            totalRows: data.Main ? data.Main.length : 0,
        };
    }

    static roundDecimalToString(num) {
        return NumberFormat.formatDecimal(NumberFormat.round(num, 2)).toString();
    }

    static loadBetlistPagingData(data) {
        return {
            rows: data.rows,
            userData: data.userdata,
            totalRows: data.records,
            total: data.total,
            page: data.page,
        };
    }
}

export default BetListHelper;
