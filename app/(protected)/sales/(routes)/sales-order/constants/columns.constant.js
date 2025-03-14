import { getLabel } from "../../../../../../constants/localization/labels.constants";
import { ENUM_FILTERS } from "../../../../../../constants/filters.constants";
import GridOwner from "../../../../../../components/Ui/gridOwner/GridOwner";
import { checkNull } from "../../../../../../utils/utils";
import GridStatusComp from "../../../_components/gridStatusComp";

export const SALES_COLUMN = {
  ORDER_NUMBER: {
    title: getLabel("Order number"),
    slector: "SALEORD_NUMBER",
    Wid: 265,
    filter: ENUM_FILTERS.text,
  },
  OWNER: {
    title: getLabel("Owner"),
    slector: "",
    Wid: 100,
    customComp: GridOwner,
    sticky: true,
  },
  STATUS: {
    title: getLabel("Status"),
    slector: "SO_CURRENT_STATUS",
    Wid: 150,
    customComp: GridStatusComp,
    filter: ENUM_FILTERS.check,
  },
  ORDER_DATE: {
    title: getLabel("Order Date"),
    Wid: 150,
    slector: "SALE_ORDER_DATE",
    date: true,
  },
  CUSTOMER: {
    title: getLabel("Customer"),
    Wid: 150,
    slector: "CUSTOMER_NAME",
    filter: ENUM_FILTERS.text,
  },
  WEB_ORDER: {
    title: getLabel("Web Order"),
    slector: "WOC_SO_NUMBER",
    Wid: 150,
    filter: ENUM_FILTERS.text,
  },
  "TRACKING_#": {
    title: getLabel("Tracking #"),
    slector: "TRACKING_NUMBER",
    filter: ENUM_FILTERS.text,
    Wid: 150,
  },
  ADDRESS: {
    title: getLabel("Address"),
    slector: "SHIPPING_ADDRESS",
    filter: ENUM_FILTERS.text,
    Wid: 150,
  },
  CUSTOMER_TYPE: {
    title: getLabel("Customer Type"),
    slector: "MASS_CUSTOMER_FLAG",
    Wid: 200,
    filter: ENUM_FILTERS.text,
    customComp: ({ data }) => (
      <div
        className={`w-full h-full flex items-center cursor-pointer justify-center`}
      >
        {checkNull(data) ? "" : data.toLowerCase() === "y" ? "Mass" : "Prepay"}
      </div>
    ),
  },
  CONTACT: {
    title: "Contact",
    slector: "PHONE",
    Wid: 100,
    filter: ENUM_FILTERS.text,
  },
  ACTION: {
    title: "Action",
    Wid: 150,
    slector: "PO_CURRENT_STATUS",
    // Status: PurchaseMGridAction,
    //   customComp: GridAction,
    //   onHandleClick: onHandleClick,
    mWid: 200,
    // hidden: false,
    // def: false,
  },
};
