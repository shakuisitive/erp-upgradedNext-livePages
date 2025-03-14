export const ENUM_API = {
  GetSaleOrderList: {
    ENDPOINT: "InventoryWeb/GetSaleOrderList",
    PAYLOAD: {
      action: "InventoryWeb",
      method: "GetSaleOrder",
      data: {
        BOLTON_ORDER_FLAG: "N",
        CUS_ID: "",
        EUT_ORDER_FLAG: "N",
        FINZ_FLAG: null,
        INVALID_ORDER_FLAG: "N",
        LOC_ID: "",
        OFFSET: "",
        ORDER: "",
        RNUM_FROM: 1,
        RNUM_TO: 25,
        SEARCH: "",
        SO_STATUS: "",
        SPS_ORDER_FLAG: "N",
        VOID_FLAG: null,
        WEB_ORDER_FLAG: "N",
      },
    },
  },
};
