import React, { useState, useEffect, useRef } from "react";
import { setDiscount } from "../../../redux/Purchase.slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";

const NetCostGrid = ({ data, rowData, index }) => {

   //console.log('row data', rowData)
  const dispatch = useDispatch();
  const focRef = useRef(null);
  const [inputValue, setInputValue] = useState(); 
  const [eMessage, setEMessage] = useState('')
  const [isEMessage, setIsErrorMessage]  = useState(false)
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);


  useEffect(() => {
    setInputValue(Number(rowData?.NET_COST)); 
  }, [rowData]);


  const setChange = (e) => {
    if(rowData.COST > e.target.value) {
      setInputValue(Number(e.target.value))
      const dataDis = {
        cat: "net",
        data: Number(e.target.value),
        indexR: index,
      };
      dispatch(setDiscount(dataDis));
    } else {
      setEMessage('Net Cost Not Greater Then Cost')
      setIsErrorMessage(true)
    }
  };


  

  return (
    <div className="flex justify-center items-center bg-[#E1EFF2] px-[3px] w-full text-[14px] text-customblack">
      <input
        value={inputValue}
        onChange={setChange}
        className="w-full text-center outline-none py-[3px]"
        type="number"
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
        disabled={
          rowData.PAR_ID != 0 && FormStatus == "Initiated"
            ? false
            : rowData.PAR_ID != 0 && FormStatus == "New"
            ? false
            : rowData.PAR_ID != 0 && FormStatus == "Issued to Vendor"
            ? false
            : true
        }
      />
      {
        isEMessage && (
          <Modal  setIsErrorMessage={setIsErrorMessage} eMessage={eMessage}/>
        )
      }
    </div>
  );
};

export default NetCostGrid;
