import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  Inventory,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../_redux/GLGroupSlice";

const EditGroupCatagory = ({ data, rowData }) => {
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      GLACCGRO_ID: rowData?.GLACCGRO_ID,
      GROUP_TYPE: rowData?.GROUP_TYPE,
      DESCRIPTION: desc,
      CODE: rowData?.CODE,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
      USE_ID: rowData?.USE_ID,
    },
    action: "InventoryWeb",
    method: "PostGlAccountGroup",
    username: "SALES",
    type: "rpc",
    tid: "144",
  };
  const handlePostPartCat = (data) => {
    if (data.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
  };
  const handleChange = (e) => {
    setDesc(e.target.value);
  };
  const onBlurHandler = () => {
    sendRequest(
      Inventory.PostGlAccountGroup,
      "POST",
      payload,
      handlePostPartCat,
      token
    );
  };
  useEffect(() => {
    setDesc(data);
  }, [data, rowData]);
  // console.log("data:", data);
  // console.log("desc data:", desc);
  // console.log("rowdata data:", rowData?.DESCRIPTION);
  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          //   name={key}
          value={desc}
          //   onKeyDown={handleArrowKey}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditGroupCatagory;
