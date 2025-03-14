"use client";
import React, { useEffect, useState } from "react";
import CreatableDropdown from "../../../../../../../components/misc/pureComponents/creatabledropdown/CreatableDropdown";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../customHook/useKeyPress";
import {
  setRefresh,
  newPurchaseOrder,
  newPurchase,
  openNModall,
} from "../../redux/Purchase.slice";
import { GoHome } from "react-icons/go";
import NewPurchaseForm from "../NewPurchaseForm/NewPurchaseForm";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";

import moment from "moment";
const PurchaseGridAdd = ({ title }) => {
  let [error, sendRequest] = useApiFetch();

  const dispatch = useDispatch();
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderOption
  );

  // // console.log('Refresh log check' , Refresh);

  const [options, setOptions] = useState([
    { value: "Nutraunex", label: "Nutraunex" },
    { value: "Supplier", label: "Supplier" },
    { value: "Getz", label: "Getz" },
  ]);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const payload = {
    data: {
      ETA_DATE: "",
      FNZ_USE_ID: "2694",
      PO_DATE: "",

      PREPARED_DATE: "",
      PURORD_ID: "",
      TERMS_CONDITION: "",
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: "",
      VOID_FLAG: "",
      VOID_NOTES: "3117",
      WAR_ID: "",
    },
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const issuePayload = [
    {
      APPROVED_FLAG: "Y",
      // COMPLETE_FLAG :  "N" ,
      ETA_DATE: null,
      FNZ_FLAG: "N",
      FNZ_USE_ID: "2694",
      NOTES: null,
      PO_DATE: "",
      PREPARED_DATE: "",
      PURORD_ID: "",
      REFERENCE_NUMBER: null,
      // TERMS_CONDITION: null ,
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: "",
      VOID_FLAG: "",
      VOID_NOTES: null,
      WAR_ID: "",
    },
  ];

  // const token = typeof window !== 'undefined' ? localStorage.getItem('tokenSession') : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const handleCreateOption = (inputValue) => {
    const newOption = {
      value: inputValue,
      label: inputValue,
    };
    setOptions([...options, newOption]);
  };

  const getAllTask = (data) => {
    // dispatch(setLotList(data.Result))
    // // console.log('check ersponse ' , data.CODE);

    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  };

  // const handleChangeOption = (e) =>{

  //     const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss±HH:mm');
  //     const currentDate = moment().format('YYYY-MM-DD');

  // payload.data.VEN_ID = e?.value ;
  // payload.data.PO_DATE= currentDateTime ;
  // payload.data.PREPARED_DATE= currentDate ;
  // // // console.log('slected select' , payload);

  // sendRequest(apiUrl, 'POST', payload, getAllTask, token)

  // }

  const handleChangeOption = (e) => {
    if (e?.value != undefined) {
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss±HH:mm");
      const currentDate = moment().format("YYYY-MM-DD");

      payload.data.VEN_ID = e?.value;
      payload.data.PO_DATE = currentDateTime;
      payload.data.PREPARED_DATE = currentDate;

      issuePayload[0].VEN_ID = e?.value;
      issuePayload[0].PO_DATE = currentDateTime;
      issuePayload[0].PREPARED_DATE = currentDate;

      const payloadData = {
        NewPayload: payload,
        IssuePayload: issuePayload,
      };
      // // console.log('slected select' , payload);
      dispatch(newPurchase(payloadData));
      // setIsModalOpen(true);
      // sendRequest(apiUrl, 'POST', payload, getAllTask, token)
    }
    // console.log('ccheck e' , e);
  };

  const newFunc = () => {
    dispatch(openNModall());
  };

  const onKeyPress = (event) => {
    if (event.key == "n") {
      event.preventDefault();
      dispatch(openNModall());
    }
  };

  useKeyPress(["n"], onKeyPress);

  return (
    <div>
      <div
        onClick={newFunc}
        className="w-full hover:bg-gray-100 flex justify-start "
      >
        <CreatableDropdown
          isDisabled={true}
          slectedOption={handleChangeOption}
          value={checkUpdatelist}
          title={title}
          handleCreateOption={handleCreateOption}
        />
      </div>
    </div>
  );
};

export default PurchaseGridAdd;
