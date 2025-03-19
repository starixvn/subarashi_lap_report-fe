import NumberFormat from '@/lib/numberFormat';
import Site from '@/lib/site';
import { TableSettings } from './constants';

class Service {
    static downloadExcelFile(response, fileName) {
        Site.downloadFile(response.data, `${fileName}.xls`);
    }

    static convertToBetListController(controller) {
        return controller.concat('BetList');
    }

    static loadInitParams(query) {
        const params = Object.fromEntries(new URLSearchParams(query));
        params.Page = isNaN(params?.Page) ? TableSettings.PageIndex : Number(params.Page);
        params.Rows = isNaN(params?.Rows) ? TableSettings.PageSize : Number(params.Rows);

        return params;
    }

    static initQuery(query) {
        if (query.length) {
            return query;
        }

        return '?';
    }

    static getSettingQuery() {
        return '&DataOnly=false';
    }

    static loadBetListData(data) {
        return {
            rows: data.Main,
            userData: {
                WinLoss: NumberFormat.formatDecimal(data.Total.SumWinLoss),
                LicenseeWL: NumberFormat.formatDecimal(data.Total.SumLicenseeWl),
                BetEffective: NumberFormat.formatDecimal(data.Total.SumBetEffective),
                Stake: NumberFormat.formatDecimal(data.Total.SumStake),
            },
            totalRows: data.Main ? data.Main.length : 0,
        };
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

export default Service;
