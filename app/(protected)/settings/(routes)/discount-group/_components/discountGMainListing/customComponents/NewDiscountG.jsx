import React, { useState } from "react";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing } from "../../../_redux/DiscountGroupSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { add } from "date-fns";

const NewDiscountG = () => {
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
    setCode(data?.Result[0].VALIDATION_RESULT);
  };
  const clickHandler = () => {
    setEnabled(true);
  };
  const handleInput = (e) => {
    const validCodePayload = {
      data: {
        TYPE: "DISCOUNT_GROUP_CODE",
        CODE: e.target.value.toString(),
      },
      action: "InventoryWeb",
      method: "GetCodeUniqueValidation",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    sendRequest(
      ItemMaster.GetCodeUniqueValidation,
      "POST",
      validCodePayload,
      handleCodeValidation,
      token
    );
    setAddProduct(e.target.value);
  };

  let payloadPostPartCat = {
    data: {
      DISGRP_ID: "",
      CODE: addProduct,
      NAME: "",
      DESCRIPTION: "",
      ACTIVE_FLAG: "Y",
      DISCOUNT_VALUE: "",
      DISCOUNT_PERCENTAGE: "",
    },
    action: "Administration",
    method: "PostDiscountGroup",
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
    if (addProduct != null && addProduct != "" && code === "TRUE") {
      sendRequest(
        Administration.PostDiscountGroup,
        "POST",
        payloadPostPartCat,
        handlePostPartDet,
        token
      );
    }
  };
  const keyDownHandler = (e) => {
    if (
      e.key === "Enter" &&
      addProduct != null &&
      addProduct != "" &&
      code == "TRUE"
    ) {
      sendRequest(
        Administration.PostDiscountGroup,
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
          placeholder="New Discount Group+"
          className={`w-full h-7 text-center border border-gray-300 focus:outline-none focus:border-gray-500 ${
            code === "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addProduct}
          onKeyDown={keyDownHandler}
          onChange={handleInput}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Product Groups +
        </button>
      )}
    </div>
  );
};

export default NewDiscountG;
