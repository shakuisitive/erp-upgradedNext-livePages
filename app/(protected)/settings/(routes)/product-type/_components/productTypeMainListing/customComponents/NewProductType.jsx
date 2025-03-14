import React, { useState } from "react";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing } from "../../../_redux/productTypeSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const NewProductType = ({ rowData }) => {
  const [addProduct, setAddProduct] = useState("");
  const [enabled, setEnabled] = useState(false);
  let [code, setCode] = useState(null);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const handleCodeValidation = (data) => {
    // setCode(data?.Result[0].VALIDATION_RESULT);
  };
  const clickHandler = () => {
    setEnabled(true);
  };
  const handleInput = (e) => {
    setAddProduct(e.target.value);

    // const validCodePayload = {
    //   data: {
    //     TYPE: "DISCOUNT_GROUP_NAME",
    //     CODE: e.target.value.toString(),
    //   },
    //   action: "InventoryWeb",
    //   method: "GetCodeUniqueValidation",
    //   username: "admin",
    //   type: "rpc",
    //   tid: "144",
    // };
    // sendRequest(
    //   ItemMaster.GetCodeUniqueValidation,
    //   "POST",
    //   validCodePayload,
    //   handleCodeValidation,
    //   token
    // );
  };

  let payloadPostPartCat = {
    data: {
      PROD_TYPE_ID: "",
      CODE: addProduct,
      NAME: "" || rowData?.NAME,
      DESCRIPTION: "" || rowData?.DESCRIPTION,
      NOTES: "" || rowData?.NOTES,
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "PostProductType",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostPartDet = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setRefreshing(true));
      setAddProduct("");
    }
  };
  const blurHandler = (e) => {
    if (addProduct != null && addProduct) {
      sendRequest(
        Administration.PostProductType,
        "POST",
        payloadPostPartCat,
        handlePostPartDet,
        token
      );
    }
  };
  return (
    <div>
      {enabled ? (
        <input
          placeholder="New Product Type"
          className={`w-full h-7 text-center border border-gray-300 focus:outline-none focus:border-gray-500 ${
            code === "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addProduct}
          //   onKeyDown={keyDownHandler}
          onChange={handleInput}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Product Type +
        </button>
      )}
    </div>
  );
};

export default NewProductType;
