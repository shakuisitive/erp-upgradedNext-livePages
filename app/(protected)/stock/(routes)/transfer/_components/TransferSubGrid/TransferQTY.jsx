import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSubQty } from "../../redux/TransferSlice";

import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const TransferQTY = ({ rowData, index, id, obj }) => {
  const focRef = useRef(null);
  const dispatch = useDispatch();
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const subData = useSelector((state) => state.TransferSlice.subData[0]);

  const onChange = (e) => {
    const data = {
      PId: rowData.INVTRA_ID,
      qty: e.target.value,
      RId: rowData.INVTRADET_ID,
      ind: index,
    };
    dispatch(UpdateSubQty(data));
  };

  return (
    <div
      className={`w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center `}
    >
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={onChange}
        value={rowData.QUANTITY}
        disabled={subData?.form[0]?.TRANSFER_STATUS == "NEW" ? false : true}
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default TransferQTY;
