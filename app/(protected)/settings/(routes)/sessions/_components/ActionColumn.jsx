"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { refresh, setRefresh, setRefreshing } from "../_redux/sessionSlice";
import VerifyModal from "../../../../../../components/misc/pureComponents/modal/VerifyModal";
//
const ActionColumn = ({ data, rowData }) => {
  const [error, sendRequest] = useApiFetch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions
 `;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const payloadDetails = {
    data: {
      EDISCRSES_ID: rowData.EDISCRSES_ID,
    },

    action: "Inventory",
    method: "PostKillScreenSessions",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const getProdectDetailResR = (data) => {
    if (data?.CODE === "SUCCESS") {
      setIsModalOpen(false);
      dispatch(setRefreshing(true));
    }
  };

  const handleSelectedOptionChange = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    sendRequest(baseUrl, "POST", payloadDetails, getProdectDetailResR, token);
  };
  return (
    <div className=" w-full bg-red-500 " onClick={handleSelectedOptionChange}>
      <p className="text-white font-bold justify-center text-center mt-2">
        {" "}
        End Session
      </p>
      {isModalOpen && (
        <VerifyModal
          onClose={handleClose}
          msg="Are you sure to end the session?"
          action={handleClick}
          cancle="Cancle"
          verify="Continue"
        />
      )}
    </div>
  );
};
export default ActionColumn;
