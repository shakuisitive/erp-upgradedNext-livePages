import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMSGQty, updateQty } from "../redux/receivingSlices";

const ReceivingQtyInput = ({ data, id, rowData }) => {
  // console.log('row data', rowData)
  const [changeValue, setChangeValue] = useState(data);
  const formStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const mGDetils = useSelector((state) => state.receivingSlices.mGDetils);
  const subGridState = useSelector(
    (state) => state.receivingSlices.mGSubDataDet
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
      dispatch(updateMSGQty({ id: foundItem.INVRECDET_ID, value: inputValue }));
    } else {
      alert("Quantity is greater than order quantity");
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
          mGDetils?.RECEIVING_STATUS === "NEW" ||
          rowData?.BACK_ORDER_FLAG === "N"
            ? false
            : true
        }
        onDoubleClick={(e) => e.target.select()}
      />
    </div>
  );
};

export default ReceivingQtyInput;
