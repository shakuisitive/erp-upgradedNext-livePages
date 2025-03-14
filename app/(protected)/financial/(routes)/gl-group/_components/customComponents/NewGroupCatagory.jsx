import React, { useState } from "react";
import {
  Inventory,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshing } from "../../_redux/GLGroupSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const NewGroupCatagory = () => {
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
        TYPE: "DISCOUNT_GROUP_NAME",
        CODE: e.target.value.toString(),
      },
      action: "InventoryWeb",
      method: "GetCodeUniqueValidation",
      username: "SALES",
      type: "rpc",
      tid: "144",
    };
    setAddProduct(e.target.value);
    sendRequest(
      ItemMaster.GetCodeUniqueValidation,
      "POST",
      validCodePayload,
      handleCodeValidation,
      token
    );
  };

  let payloadPostPartCat = {
    data: {
      GLACCGRO_ID: "",
      GROUP_TYPE: "",
      DESCRIPTION: "-",
      CODE: addProduct,
      ACTIVE_FLAG: "Y",
      USE_ID: "3031",
    },
    action: "InventoryWeb",
    method: "PostGlAccountGroup",
    username: "SALES",
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
    if (addProduct != null && addProduct != "" && code == "TRUE") {
      sendRequest(
        Inventory.PostGlAccountGroup,
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
          placeholder="New Product"
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
          Add Product +
        </button>
      )}
    </div>
  );
};

export default NewGroupCatagory;
