import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../customHook/useApiFetch";
import { Administration, ItemMaster } from "../constants/apiConstant";
import {
  UoM,
  UoW,
  Vendor,
  Warehouse,
  Customer,
  setPurchaseG,
  setHTData,
  setGroupList,
  setProductType,
  setProductClass,
  setSubGroup,
  setBrandList,
  setCategoryList,
} from "../../../../redux/commonSlice";

const CommonApiFetch = () => {
  const [error, sendRequest] = useApiFetch();

  const dispatch = useDispatch();
  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const [apiCalled, setApiCalled] = useState(false);

  const subGroupList = useSelector((state) => state.commonSlices.subGroupList);
  const token = useSelector((state) => state.user.tokenSession);

  useEffect(() => {
    if (!apiCalled && subGroupList.length === 0) {
      setApiCalled(true);
      getWarehouse();
    }
  }, [apiCalled, subGroupList.length]);

  const PayloadUoW = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
    },
    action: "InventoryWeb",
    method: "GetUowList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const PayloadUoM = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
    },
    action: "ItemMaster",
    method: "GetPartsUom",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };
  const PayloadSupplierCode = {
    data: { SEARCH: "" },

    method: "GetSupplierCode",
    password: "admin",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const payloadcustomer = {
    data: {
      SEARCH: "",
      ORDER: "",
      ACTIVE_FLAG: "Y",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "10000",
    },
    action: "Administration",
    method: "GetCustomersList",
    type: "rpc",
    tid: "144",
  };
  const getPurchaseGroup = (data) => {
    dispatch(setPurchaseG(data.Result));
  };
  const payloadPurchseG = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      OFFSET: "",
      ACTIVE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "GetPurchaseGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const HTPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "CODE DESC",
    },
    action: "Administration",
    method: "GetHarmonizedTarrifCodeList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const groupPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "CODE ASC",
    },
    action: "Administration",
    method: "GetPartGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const productTypePayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "CODE DESC",
    },
    action: "Administration",
    method: "GetProductTypeList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const brandListPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "Y",
      ORDER: "",
    },
    action: "Administration",
    method: "GetPartBrandList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const categoryPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "Y",
      ORDER: "",
    },
    action: "Administration",
    method: "GetPartCategoryList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const ProductClassPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "CODE DESC",
    },
    action: "Administration",
    method: "GetProductClassList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const subGroupPayload = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "",
    },
    action: "Administration",
    method: "GetPartSubGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const getWarehouse = () => {
    const PayloadWarehouse = {
      data: {
        SEARCH: "",
      },
      action: "InventoryWeb",
      method: "GetWarehouse",
      username: "admin",
      password: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      ItemMaster.GetWarehouse,
      "POST",
      PayloadWarehouse,
      handleWarehouse,
      token
    );
    sendRequest(
      Administration.GetPartBrandList,
      "POST",
      brandListPayload,
      handleBrand,
      token
    );
  };
  // functions
  const handleBrand = (data) => {
    dispatch(setBrandList(data?.Result));
    sendRequest(
      Administration.GetPartCategoryList,
      "POST",
      categoryPayload,
      handleCategory,
      token
    );
  };
  const handleCategory = (data) => {
    dispatch(setCategoryList(data?.Result));
  };
  const handleWarehouse = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(Warehouse(data.Result));

      sendRequest(
        Administration.GetUoWList,
        "POST",
        PayloadUoW,
        handleUoW,
        token
      );
    }
  };
  const handleUoW = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(UoW(data?.Result));

      sendRequest(ItemMaster.GetPartsUom, "POST", PayloadUoM, handleUoM, token);
      sendRequest(
        Administration.GetCustomersList,
        "POST",
        payloadcustomer,
        handleCustomer,
        token
      );
    }
  };
  const handleCustomer = (data) => {
    dispatch(Customer(data.Result));
  };
  const handleUoM = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(UoM(data.Result));
      sendRequest(
        ItemMaster.GetSupplierCode,
        "POST",
        PayloadSupplierCode,
        handleSupplier,
        token
      );
      sendRequest(
        Administration.GetPurchaseGroupList,
        "POST",
        payloadPurchseG,
        getPurchaseGroup,
        token
      );
    }
  };
  const handleSupplier = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(Vendor(data.Result));
      sendRequest(
        Administration.GetHarmonizedTarrifCodeList,
        "POST",
        HTPayload,
        handleGetHTData,
        token
      );
    }
  };

  const handleGetHTData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setHTData(data?.Result || data?.Results));
      sendRequest(
        Administration.GetPartGroupList,
        "POST",
        groupPayload,
        handleGetGroupData,
        token
      );
    }
  };

  const handleGetGroupData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setGroupList(data?.Result || data?.Results));
      sendRequest(
        Administration.GetProductTypeList,
        "POST",
        productTypePayload,
        handleGetProductListData,
        token
      );
    }
  };

  const handleGetProductListData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setProductType(data?.Result || data?.Results));
      sendRequest(
        Administration.GetProductClassList,
        "POST",
        ProductClassPayload,
        handleGetProductClassData,
        token
      );
    }
  };

  const handleGetProductClassData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setProductClass(data?.Result || data?.Results));
      sendRequest(
        Administration.GetPartSubGroupList,
        "POST",
        subGroupPayload,
        handleGetSubGroupData,
        token
      );
    }
  };

  const handleGetSubGroupData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setSubGroup(data?.Result || data?.Results));
    }
  };
  return null;
  // getWarehouse();
};

export default CommonApiFetch;
