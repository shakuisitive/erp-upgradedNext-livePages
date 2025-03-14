import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQty } from "../../redux/receivingSlices";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const ReceivingQtyInput = ({ data, id, rowData }) => {
  const [changeValue, setChangeValue] = useState(data);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const formStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const subGridState = useSelector(
    (state) => state.receivingSlices.subGridState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setChangeValue(data);
  }, [data]);
  const setChange = (e) => {
    const inputValue = e.target.value;
    const foundItem = subGridState.find(
      (item) => item.INVRECDET_ID === rowData?.INVRECDET_ID
    );
    const itemOrderQuantity = foundItem?.BO_QUANTITY;

    if (inputValue <= itemOrderQuantity) {
      setChangeValue(inputValue);
      dispatch(updateQty({ id: foundItem.INVRECDET_ID, value: inputValue }));
    } else {
      setEMessage("Received quantity must be equal to or less than order quantity");
      setIsErrorMessage(true);
      setChangeValue(0);
      
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#E1EFF2] px-[3px] w-full text-[14px] text-customblack ">
      <input
        className="w-full outline-none text-center"
        type="number"
        onChange={setChange}
        value={changeValue}
        disabled={
          formStatus === "NEW" || rowData?.BACK_ORDER_FLAG === "N"
            ? false
            : true
        }
        onDoubleClick={(e) => e.target.select()}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default ReceivingQtyInput;
