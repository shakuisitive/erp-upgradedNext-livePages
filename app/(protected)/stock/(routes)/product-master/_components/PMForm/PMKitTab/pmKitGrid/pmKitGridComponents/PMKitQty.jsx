import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKitQty, setQtyUsed, updateKitItemQty } from "../../../../../redux/pmSlice";
import Modal from "../../../../../../../../../../components/misc/pureComponents/modal/Modal";

const PMKitQty = ({ rowData, id, data }) => {
  const [changeValue, setChangeValue] = useState(0);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let avlQty = useSelector((state) => state.pmSlices.avlQty);
  let kitQty = useSelector((state) => state.pmSlices.kitQty);
  console.log('kitQty' ,kitQty)
  const dispatch = useDispatch();

  useEffect(() => {
    setChangeValue(data);
  }, [data]);

  const validateAndSetChange = (total, value) => {
   
    if (avlQty >= total ) {
      setChangeValue(value);
      const data = {
        qnt: value,
        id: rowData.PAR_ID,
      };
      dispatch(updateKitItemQty(data));
    } else {
      setEMessage("The available quantity is insufficient");
      setIsErrorMessage(true);
      setChangeValue(0);
    }
  };

  const handleBlur = (e) => {
    const value = Number(e.target.value);
    const total = value * Number(kitQty);
    dispatch(setQtyUsed(total))
    validateAndSetChange(total, value);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setChangeValue(value);
  };

  return (
    <div
      className={`w-full flex items-center ${
        rowData.QUANTITY === null ? "border-[2px] border-red-400" : ""
      } px-[3px] justify-center `}
    >
      <input
        className="w-full outline-none text-customblack text-sm text-center bg-white py-[3px]"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={changeValue}
        disabled={ rowData.QUANTITY > 0 && rowData?.KITDET_ID != ''  ? true : false}
        onDoubleClick={(e) => e.target.select()}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PMKitQty;
