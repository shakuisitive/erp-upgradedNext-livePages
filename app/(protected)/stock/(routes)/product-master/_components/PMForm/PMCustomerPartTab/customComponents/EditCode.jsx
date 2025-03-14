import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setPartNameOverride } from "../../../../redux/pmSlice";

const EditCode = ({ rowData, data }) => {
  let [error, sendRequest] = useApiFetch();
  const [isSend, setIsSend] = useState(false);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();

  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getCustomer = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setPartNameOverride(data.Result));
    }
    setIsSend(false);
  };
  const getPayload = {
    data: {
      PAR_ID: formIndex?.PAR_ID,
    },
    action: "Administration",
    method: "GetPartNameOverrides",
    type: "rpc",
    tid: "144",
  };
  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Administration.GetPartNameOverrides,
        "POST",
        getPayload,
        getCustomer,
        token
      );
    }
  };
  const getDetailPayload = {
    data: [
      {
        VEN_ID: "",
        CODE: code,
        ACTIVE_FLAG: "N",
        CUS_ID: rowData?.CUS_ID,
        PAR_ID: rowData?.PAR_ID,
        PARNAMEOVR_ID: rowData?.PARNAMEOVR_ID,
      },
    ],
    action: "Administration",
    method: "PostPartNameOverrides",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Administration.PostPartNameOverrides,
        "POST",
        getDetailPayload,
        getDetail,
        token
      );
      // dispatch(setClearTaxPayload());
    }
  }, [isSend]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleOnBlur = () => {
    setIsSend(true);
  };
  //   useEffect(() => {
  //     setCode(data);
  //   }, [data, rowData]);
  return (
    <div className="w-full flex items-center px-[3px] justify-center ">
      <input
        className="w-full outline-none text-center text-customblack text-[14px] bg-white py-[3px]"
        type="text"
        onChange={handleCodeChange}
        value={code || data}
        onBlur={handleOnBlur}
        // ref={focRef}
        // onDoubleClick={(e) => e.target.select()}
      />
    </div>
  );
};

export default EditCode;
