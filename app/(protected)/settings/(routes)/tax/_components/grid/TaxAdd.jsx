"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefresh, setRefreshing } from "../../redux/taxSlice";
import {
  ItemMaster,
  Administration,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
// const TaxAdd = () => {
//   const [addTax, setaddTax] = useState("");
//   const [enabled, setEnabled] = useState(false);
//   let [code, setCode] = useState(null);
//   const dispatch = useDispatch();
//   let [error, sendRequest] = useApiFetch();
//   const Token = useSelector((state) => state.user.tokenSession);

//   const handleCodeValidation = (data) => {
//     setCode(data?.Result[0].VALIDATION_RESULT);
//   };
//   const clickHandler = () => {
//     setEnabled(true);
//   };
//   const handleInput = (e) => {
//     const validCodePayload = {
//       data: {
//         TYPE: "TAX_CODE",
//         CODE: e.target.value.toString(),
//       },
//       action: "InventoryWeb",
//       method: "GetCodeUniqueValidation",
//       username: "admin",
//       type: "rpc",
//       tid: "144",
//     };
//     setaddTax(e.target.value);
//     sendRequest(
//       ItemMaster.GetCodeUniqueValidation,
//       "POST",
//       validCodePayload,
//       handleCodeValidation,
//       Token
//     );
//   };

//   let payloadPostPartCat = {
//     data: {
//       TAX_ID: "",
//       CODE: addTax,
//       DESCRIPTION: "",
//       ACTIVE_FLAG: "Y",
//       NOTES: "",
//       SEQ_NUMBER: "",
//       TAX_PERCENTAGE_RATE: "",
//       USE_ID: "2694",
//       CUS_ID: null,
//     },
//     action: "Administration",
//     method: "PostTaxes",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };
//   const handlePostPartDet = (data) => {
//     if (data?.CODE == "SUCCESS") {
//       dispatch(setRefreshing(true));
//       setaddTax("");
//     }
//   };
//   const blurHandler = (e) => {
//     if (addTax != null && addTax != "" && code == "TRUE") {
//       sendRequest(
//         Administration.PostTaxes,
//         "POST",
//         payloadPostPartCat,
//         handlePostPartDet,
//         Token
//       );
//     }
//   };
//   return (
//     <div>
//       {enabled ? (
//         <input
//           placeholder="New Tax+"
//           className={`w-full h-7 text-center border border-gray-300 focus:outline-none focus:border-gray-500 ${
//             code === "FALSE" ? "outline outline-2 outline-red-500" : ""
//           }`}
//           value={addTax}
//           //   onKeyDown={keyDownHandler}
//           onChange={handleInput}
//           onBlur={blurHandler}
//           autoFocus
//         />
//       ) : (
//         <button className="w-full h-7 text-center " onClick={clickHandler}>
//           add Tax +
//         </button>
//       )}
//     </div>
//   );
// };

const TaxAdd = () => {
  let [enabled, setEnabled] = useState(false);
  let [addTax, setaddTax] = useState();
  let [code, setCode] = useState(null);
  let [error, sendRequest] = useApiFetch();
  let username = useSelector((state) => state.tax.username);
  let userID = useSelector((state) => state.tax.user_ID);

  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "ItemMaster/GetCodeUniqueValidation";
  let codeUrl =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL +
    "InventoryWeb/GetCodeUniqueValidation";
  let dispatch = useDispatch();
  let payload = {
     action: "ItemMaster",
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: 1,
      RNUM_TO: 25,
      PROSTA_ID: "",
      PROSTATAX_ID: "",
      ACTIVE_FLAG: "Y",
    },
      method: "GetCodeUniqueValidatio",
      tid: "144",
      type: "rpc",
      username: "SALES"
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
    setaddTax("");
  };

  const clickHandler = () => {
    setEnabled(true);
  };
  const changeHandler = (e) => {
    validCodePayload = {
      data: {
              TYPE: "TAX_CODE",
                CODE: e.target.value.toString(),
              },
              action: "InventoryWeb",
              method: "GetCodeUniqueValidation",
              username: "admin",
              type: "rpc",
              tid: "144",
    };
    setaddTax(e.target.value);
    sendRequest(codeUrl, "POST", validCodePayload, getCode, token);
  };

  const blurHandler = (e) => {
    if (addTax != null &&addTax != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter" &&addTax != null &&addTax != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };

  return (
    <div>
      {enabled ? (
        <input
          placeholder="New Tax"
          className={`w-full h-7 text-center ${
            code == "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addTax}
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Tax+
        </button>
      )}
    </div>
  );
};

export default TaxAdd;
