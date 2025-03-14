import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateSubVoidNotes,
  readyGridPayLoad,
  readySubGridPayLoad,
  readySubGridVoidPayLoad,
  setAssignDrawer,
  setPhysicalCountDetails,
  setPhysicalCountForm,
  setRefresh,
  updateVoid,
} from "../redux/TransferSlice";
import {
  PhysicalCount,
  Transfer,
} from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import PdfModal from "../../../../../../components/misc/pureComponents/modal/PdfModal";
import VoidNotes from "../../../../../../components/misc/pureComponents/modal/VoidNotes";

const TransferMainAction = ({ rowData, data, obj, id }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  // console.log(" payload id", rowData?.INVTRA_ID);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const cancelButtonRef = useRef(null);
  const [isSend, setIsSend] = useState(false);
  const [voidFlag, setVoidFlag] = useState(false);

  const payload = useSelector((state) => state.TransferSlice.subPayload);
  const voidPayload = useSelector((state) => state.TransferSlice.voidPayload);

  const onSubmit = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const onVoidModal = () => {
    setIsVoid(true);
    setTooltipVisible(false);
  };

  const FinalizedPayload = {
    data: {
      INVTRA_ID: rowData?.INVTRA_ID,
      USE_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostTransferFinalized",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleFinalized = (data) => {
    setTooltipVisible(false);
    dispatch(setRefresh(true));
    if (data.CODE == "SUCCESS") {
      dispatch(setSubPayload());
    }
  };
  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      if (!voidFlag) {
        sendRequest(
          Transfer.PostTransferFinalized,
          "POST",
          FinalizedPayload,
          handleFinalized,
          token
        );
      }
    }
    if (voidFlag) {
      dispatch(setRefresh(true));
      setTooltipVisible(false);
      dispatch(setSubPayload());
    }
  };
  const getForm = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Transfer.PostInventoryTransferDetails,
        "POST",
        payload?.detailPayload || voidPayload?.detailPayload,
        getDetail,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Transfer.PostInventoryTransfer,
        "POST",
        payload?.formPayload || voidPayload?.formPayload,
        getForm,
        token
      );
    }
  }, [isSend]);
  const handleFinalize = () => {
    dispatch(readyGridPayLoad({ id: rowData?.INVTRA_ID }));
    setIsSend(true);
  };
  const onVoid = (notes) => {
    const data = {
      PId: rowData?.INVTRA_ID,
      notes: notes,
    };
    dispatch(UpdateSubVoidNotes(data));
    dispatch(readySubGridVoidPayLoad({ id: rowData?.INVTRA_ID }));
    setIsSend(true);
    setVoidFlag(true);
  };

  return (
    <div className="size-full relative">
      <button
        onClick={() => onSubmit()}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          data == "NEW" ? "bg-yellow-700" : "bg-green-500"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {data == "NEW" ? "Finalize" : "Completed"}
        </p>
      </button>
      {isTooltipVisible && data == "NEW" && (
        <div className="absolute z-[112] text-white  bg-white w-full p-1 text-sm shadow-lg rounded">
          {data == "NEW" && (
            <div
              onClick={() => handleFinalize()}
              className={` cursor-pointer bg-cyan-700`}
            >
              <p className="p-1 w-full m-1">Finalize</p>
            </div>
          )}
          {data == "NEW" && (
            <div
              onClick={() => onVoidModal()}
              className={` cursor-pointer bg-[#ea1b1b] rounded`}
            >
              <p className="p-1 w-full m-1">Void</p>
            </div>
          )}
        </div>
      )}
      {isVoid && (
        <VoidNotes
          setOpen={setIsVoid}
          heading={"Transfer"}
          onVoid={onVoid}
          cancelButtonRef={cancelButtonRef}
        />
      )}
    </div>
  );
};

export default TransferMainAction;
