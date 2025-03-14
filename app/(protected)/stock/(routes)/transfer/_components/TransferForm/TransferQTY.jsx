import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateQty } from "../../redux/TransferSlice";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const TransferQTY = ({ rowData, index }) => {
  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const transferDetails = useSelector(
    (state) => state.TransferSlice.transferDetails[index]
  );
  const checkQty = transferDetails?.AVL_QTY;
  // console.log("transferDetails", transferDetails?.AVL_QTY);
  const [qty, setQty] = useState("");
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setQty(e.target.value);
    const data = {
      id: rowData?.INVTRA_ID,
      qty: e.target.value,
      ind: index,
    };
    dispatch(UpdateQty(data));
  };
  useEffect(() => {
    if (qty > checkQty) {
      setEMessage("Quantity must be Equal or Less than Available Qty");
      setIsErrorMessage(true);
    }
  }, [transferDetails?.QUANTITY]);
  return (
    <div
      className={`w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ${
        transferDetails?.QUANTITY === "" && " border-red-500 border-2"
      } `}
    >
      <input
        className={`w-full outline-none text-center text-[14px] bg-white py-[3px] `}
        type="number"
        onChange={onChange}
        value={qty || rowData?.QUANTITY}
        // value={rowData.COUNT_QTY}
        disabled={TransferForm?.TRANSFER_STATUS == "Completed" ? true : false}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default TransferQTY;
