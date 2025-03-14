import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readySubGridPayLoad,
  subOrderDiscChange,
} from "../../redux/Purchase.slice";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const PurchaseSGridNetCost = ({ data, index, rowData, id, obj }) => {
  const subData = useSelector((state) => state.PurchaseSlices.subData);
  const focRef = useRef(null);
  const [changeValue, setChangeValue] = useState();
  const [eMessage, setEMessage] = useState('')
  const [isEMessage, setIsErrorMessage]  = useState(false)
  const [isSend, setIsSend] = useState(false);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  useEffect(() => {
    setChangeValue(data);
  }, [data, rowData]);

  const getProdectDetailRes = (data) => {
    setIsSend(false);
    // if (data.CODE == "SUCCESS") {
    //   // dispatch(addNewRowSubData(false));
    //   dispatch(setRefresh(true));
    // }
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payload.detailPayload,
        getProdectDetailRes,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payload.formPayload,
        getAllTaskPOrder,
        token
      );
    }
  }, [isSend]);

  const setChange = (e) => {
    if(rowData.COST > e.target.value) {
      setChangeValue(e.target.value);
      const dataDis = {
        cat: "net",
        data: e.target.value,
        POId: rowData.PURORD_ID,
        PId: rowData.PURORDDET_ID,
      };
      dispatch(subOrderDiscChange(dataDis));
    } else {
      setEMessage('Net Cost Not Greater Then Cost')
      setIsErrorMessage(true)
    }
  };

  const OnBlurApi = () => {
    dispatch(readySubGridPayLoad({ id: id }));
    setIsSend(true)
  };
  
  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ">
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={setChange}
        value={changeValue}
        onBlur={OnBlurApi}
        disabled={
          rowData?.QUANTITY == 0 ? true : 
          rowData.PAR_ID != 0 && obj?.statusId == "Initiated"
            ? false
            : rowData.PAR_ID != 0 && obj?.statusId == "New"
            ? false
            : rowData.PAR_ID != 0 && obj?.statusId == "Issued to Vendor"
            ? false
            : true
        }
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
      />
       {
        isEMessage && (
          <Modal  setIsErrorMessage={setIsErrorMessage} eMessage={eMessage}/>
        )
      }
    </div>
  );
};

export default PurchaseSGridNetCost;
