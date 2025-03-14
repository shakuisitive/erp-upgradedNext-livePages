import { checkNull } from "../../utils/utils";

export const ENUM_LABELS = {
  ACTIVE: {
    en: "Active",
  },
  COMPLETED: {
    en: "Completed",
  },
  SALES_ORDER: {
    en: "Sales Order",
  },
  SALES_ORDER_TAGLINE: {
    en: "Welcome to sales order! here you can manage all of your sales",
  },
  MAIN_TAB: {
    en: "Main Tab",
  },
  WEB_ORDER: {
    en: "Web Order",
  },
  SPS: {
    en: "SPS",
  },
  READ_MORE: {
    en: "Read more",
  },
  ORDER_NUMBER: {
    en: "Order number",
  },
  OWNER: {
    en: "Owner",
  },
  STATUS: {
    en: "Status",
  },
  ORDER_DATE: {
    en: "Order Date",
  },
  CUSTOMER: {
    en: "Customer",
  },
  "TRACKING_#": {
    en: "Tracking #",
  },
  ADDRESS: {
    en: "Address",
  },
  CUSTOMER_TYPE: {
    en: "Customer Type",
  },
  CONTACT: {
    en: "Contact",
  },
  ACTION: {
    en: "Action",
  },
  NC: {
    en: "NC",
  },
  BOLTON: {
    en: "Bolton",
  },
};

export const getLabel = (labelKey) => {
  if (checkNull(labelKey)) {
    return "";
  }
  const newKey = labelKey?.replaceAll(" ", "_")?.toUpperCase();
  const label = ENUM_LABELS?.[newKey]?.en ?? "";
  return label;
};
