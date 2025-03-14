"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { updateSubGridQty } from "../../../redux/stockSlice";

const OdrQty = ({ data, rowData }) => {
  const [changeValue, setChangeValue] = useState();
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();


  useEffect(() => {
    setChangeValue(data);
  }, [data]);

  const stockOrderFormDataId = useSelector(
    (state) => state.stockSlices.stockOrderFormDataId
  );

  const setChange = (e) => {
    // if (changeValue != 0 && e.target.value <= data ) {
      setChangeValue(e.target.value);
      dispatch(updateSubGridQty({SOId: stockOrderFormDataId, SPId: rowData.INVSTODET_ID, qty: e.target.value}))
    // } else {
    //   setEMessage(`Stock quantity must be within the range of 0 to ${data}`);
    //   setIsErrorMessage(true);
    // }
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <input
        className="w-full outline-none text-center"
        type="number"
        onChange={setChange}
        value={changeValue}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default OdrQty;
