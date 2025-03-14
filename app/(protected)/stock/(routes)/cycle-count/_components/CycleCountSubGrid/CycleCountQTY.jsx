import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateQty, UpdateSubQty, readyGridPayLoad } from "../../redux/CycleCountSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { PhysicalCount } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const CycleCountQTY = ({ rowData, index, id, obj }) => {
  const focRef = useRef(null);
  const dispatch = useDispatch();
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const [isSend, setIsSend] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const payload = useSelector((state) => state.CycleCountSlice.subPayload);
  const CycleCountForm = useSelector((state) => state.CycleCountSlice.CycleCountForm[0]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      // dispatch(setRefresh(true));
    }
  };

  const getForm = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        PhysicalCount.PostPhysicalCountDetail,
        "POST",
        payload.detailPayload,
        getDetail,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        PhysicalCount.PostPhysicalCount,
        "POST",
        payload.formPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  const onChange = (e) => {
    const data = {
      PId: rowData.PHYCOU_ID,
      bin: e.target.value,
      RId: rowData.PHYCOUDET_ID,
      ind: index,
    };
    dispatch(UpdateSubQty(data));
  };

  const OnBlurApi = () => {
    if (rowData.COUNT_QTY != 0) {
      dispatch(readyGridPayLoad({ id: id }));
      setIsSend(true);
    } else {
      setEMessage("Count must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  return (
    <div
      className={`w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center `}
    >
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={onChange}
        value={rowData.COUNT_QTY}
        onBlur={OnBlurApi}
        disabled={
          CycleCountForm.PC_STATUS == "NEW"
            ? false
            : CycleCountForm.PC_STATUS  == "Initiated"
            ? false
            : true
        }
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default CycleCountQTY;
