import { GridLocaleText,getGridStringOperators } from "@mui/x-data-grid";

export const JPLocaleText: Partial<GridLocaleText> = {
  columnHeaderSortIconLabel: "並び替え",
  columnMenuLabel: "カラム設定",
  columnMenuSortAsc: "昇順",
  columnMenuSortDesc: "降順",
  columnMenuFilter: "フィルター",
  columnMenuHideColumn: "カラムを非表示",
  columnMenuManageColumns: "カラム管理",
  columnMenuUnsort: "解除",
  paginationRowsPerPage: "表示件数",
  footerRowSelected: (count) => `${count} 行を選択`,
  paginationDisplayedRows: ({ from, to, count }) =>
    `${from}〜${to} / 全${count}件`,
  filterPanelColumns: "項目",
  filterPanelOperator: "条件",
  filterPanelInputLabel: "値",
  filterPanelInputPlaceholder: "値を入力",
  columnsManagementSearchTitle: "カラムを検索",
  checkboxSelectionHeaderName: "チェックボックス",
  columnsManagementShowHideAllText: "すべて表示/非表示",
  columnsManagementReset: "リセット",
};

export const JPOperators = getGridStringOperators().map((op) => {
  const map: Record<string, string> = {
    contains: "含む",
    doesNotContain: "含まない",
    equals: "等しい",
    doesNotEqual: "等しくない",
    startsWith: "で始まる",
    endsWith: "で終わる",
    isEmpty: "空",
    isNotEmpty: "空ではない",
    isAnyOf: "いずれかに一致",
  };

  return {
    ...op,
    label: map[op.value] ?? op.label,
  };
});