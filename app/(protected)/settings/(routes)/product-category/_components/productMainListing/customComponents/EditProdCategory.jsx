import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/prodCategorySlice";

const EditProdCategory = ({ data, rowData }) => {
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      PARCAT_ID: rowData?.PARCAT_ID,
      PARCAT_ID_PARENT: rowData?.PARCAT_ID_PARENT,
      CHILD_LEVEL: rowData?.CHILD_LEVEL,
      DESCRIPTION: desc,
      CODE: rowData?.CODE,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
      USE_ID: rowData?.USE_ID,
    },
    action: "InventoryWeb",
    method: "PostPartBrands",
    username: "admin",
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
      Inventory.PostPartCategory,
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

export default EditProdCategory;
