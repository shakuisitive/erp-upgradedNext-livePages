import React, { useEffect, useRef, useState } from "react";
import { setDiscount } from "../../../redux/Purchase.slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";

const DiscGrid = ({ data, rowData, index }) => {
  const [changeValue, setChangeValue] = useState();
  const [eMessage, setEMessage] = useState('')
  const [isEMessage, setIsErrorMessage]  = useState(false)
  const focRef = useRef(null);
  const dispatch = useDispatch();
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  useEffect(() => {
    setChangeValue(rowData?.DISCOUNT);
  }, [rowData]);
  const setChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100) {
      setChangeValue(e.target.value);
      const dataDis = {
        cat: "dis",
        indexR: index,
        val:Number( e.target.value),
      };
      dispatch(setDiscount(dataDis));
    } else {
      setEMessage('Discount Value Minimum 0 And Maximum 100')
      setIsErrorMessage(true)
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-[#E1EFF2] px-[3px] text-[14px] text-customblack">
    <div className="relative">
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        ref={focRef}
        onChange={setChange}
        value={changeValue} 
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
      <span className="absolute right-1">%</span>
    </div>
    {
      isEMessage && (
        <Modal  setIsErrorMessage={setIsErrorMessage} eMessage={eMessage}/>
      )
    }
  </div>
  );
};

export default DiscGrid;
