const ALIGNMENT_CLASSES = {
    CENTER: 'center-align',
    LEFT_TOOLTIP: 'left-align tooltip',
    RIGHT: 'right-align',
};

export default {
    PageSize: 50,
    DefaultPageSize: 50,
    PageList: [50, 100, 200, 300, 400, 500, 1000, 2000],
    SortableColumns: ['Stake', 'WinLoss', 'LicenseeWL'],
    TotalColumns: ['WinLoss', 'LicenseeWL'],
    Columns: ['Index', 'ExternalId', 'SystemId', 'TransTime', 'Choice', 'Odds', 'Stake', 'WinLoss', 'LicenseeWL', 'Status'],
    ColumnWidths: [40, 120, 120, 200, 300, 70, 120, 120, 120, 120],
    ColumnAlignments: [
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.LEFT_TOOLTIP,
        ALIGNMENT_CLASSES.LEFT_TOOLTIP,
        ALIGNMENT_CLASSES.CENTER,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.RIGHT,
        ALIGNMENT_CLASSES.CENTER,
    ],
};
