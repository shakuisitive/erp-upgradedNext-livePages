export const payloadGetAll = {
    data: {
      ACTIVE_FLAG: "Y",
      MASS_CUSTOMER_FLAG: "",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  };
export const payloadInactive = {
    data: {
      ACTIVE_FLAG: "N",
      MASS_CUSTOMER_FLAG: "",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  };
export const payloadPrepay = {
    data: {
      ACTIVE_FLAG: "Y",
      MASS_CUSTOMER_FLAG: "N",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  };
export const payloadMass = {
    data: {
      ACTIVE_FLAG: "Y",
      MASS_CUSTOMER_FLAG: "Y",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  };