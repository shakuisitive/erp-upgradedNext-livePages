import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/productGroupsSlice";

const EditProdGroupsNotes = ({ data, rowData }) => {
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      PARGRO_ID: rowData?.PARGRO_ID,
      CODE: rowData?.CODE,
      NAME: rowData?.NAME,
      DESCRIPTION: rowData?.DESCRIPTION,
      NOTES: notes,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
    },
    action: "InventoryWeb",
    method: "PostPartGroups",
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
    setNotes(e.target.value);
  };
  const onBlurHandler = () => {
    if (notes !== rowData?.NOTES) {
      sendRequest(
        Administration.PostPartGroups,
        "POST",
        payload,
        handlePostPartCat,
        token
      );
    }
  };
  useEffect(() => {
    setNotes(data);
  }, [data, rowData]);

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          value={notes}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditProdGroupsNotes;
