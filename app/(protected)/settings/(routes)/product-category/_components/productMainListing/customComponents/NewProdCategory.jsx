import React, { useState } from "react";
import {
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing, setNewModal } from "../../../_redux/prodCategorySlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const NewProdCategory = () => {
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
    dispatch(setNewModal());
  };
  const handleInput = (e) => {
    const validCodePayload = {
      data: {
        TYPE: "DISCOUNT_GROUP_NAME",
        CODE: e.target.value.toString(),
      },
      action: "InventoryWeb",
      method: "GetCodeUniqueValidation",
      username: "admin",
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
      PARCAT_ID: "",
      PARCAT_ID_PARENT: "",
      CHILD_LEVEL: "",
      DESCRIPTION: "",
      CODE: addProduct,
      ACTIVE_FLAG: "Y",
      USE_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostPartBrands",
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
    if (addProduct != null && addProduct != "" && code == "TRUE") {
      sendRequest(
        Inventory.PostPartCategory,
        "POST",
        payloadPostPartCat,
        handlePostPartDet,
        token
      );
    }
  };
  return (
    <div>
      {/* {enabled ? (
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
      ) : ( */}
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Product +
        </button>
      {/* )} */}
    </div>
  );
};

export default NewProdCategory;
