"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefreshing } from "../../redux/uomSlice";
const Adduom = () => {
  let [enabled, setEnabled] = useState(false);
  let [addUom, setAddUom] = useState();
  let [code, setCode] = useState(null);
  let [error, sendRequest] = useApiFetch();
  let username = useSelector((state) => state.uom.username);
  let userID = useSelector((state) => state.uom.user_ID);

  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostUom";
  let codeUrl =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL +
    "InventoryWeb/GetCodeUniqueValidation";
  let dispatch = useDispatch();
  let payload = {
    data: {
      UOM_ID: "",
      CUS_ID: "",
      CODE: addUom,
      DESCRIPTION: "",
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "PostUom",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  let validCodePayload;

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const getCode = (data) => {
    SVGAnimatedBoolean;
    setCode(data?.Result[0].VALIDATION_RESULT);
  };
  console.log(code);
  const getAllTask = (data) => {
    dispatch(setRefreshing(true));
    setAddUom("");
  };

  const clickHandler = () => {
    setEnabled(true);
  };
  const changeHandler = (e) => {
    validCodePayload = {
      data: {
        TYPE: "UOM_CODE",
        CODE: e.target.value,
      },
      action: "InventoryWeb",
      method: "GetCodeUniqueValidation",
      username: username,
      type: "rpc",
      tid: "144",
    };
    setAddUom(e.target.value);
    sendRequest(codeUrl, "POST", validCodePayload, getCode, token);
  };

  const blurHandler = (e) => {
    if (addUom != null && addUom != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter" && addUom != null && addUom != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };

  return (
    <div>
      {enabled ? (
        <input
          placeholder="New Uom"
          className={`w-full h-7 text-center ${
            code == "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addUom}
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Uom+
        </button>
      )}
    </div>
  );
};

export default Adduom;
