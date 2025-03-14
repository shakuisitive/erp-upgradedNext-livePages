import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readySubGridPayLoad,
  setAssignDrawer,
  setPhysicalCountDetails,
  setPhysicalCountForm,
  setRefresh,
  updateVoid,
} from "../redux/physicalCountSlice";
import { PhysicalCount } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import PdfModal from './../../../../../../components/misc/pureComponents/modal/PdfModal';
import VoidNotes from "../../../../../../components/misc/pureComponents/modal/VoidNotes";

const PCMainAction = ({ rowData, data, obj }) => {
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const cancelButtonRef = useRef(null);

  const postPayload = useSelector((state) => state.physicalCount.subPayload);

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const payload = {
    data: {
      PHYCOU_ID: `${rowData?.PHYCOU_ID}`,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCount",
    type: "rpc",
    tid: "144",
    username: "admin",
  };

  const payloadDetail = {
    data: {
      PHYCOU_ID: `${rowData?.PHYCOU_ID}`,
      OFFSET: "+5:00",
      ORDER: "ORDER BY 1 DESC",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCountDetails",
    type: "rpc",
    tid: "144",
    username: "admin",
  };

  const getDetails = (data) => {
    if(data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  }
  
    const getForm = (data) => {
      if(data.CODE == "SUCCESS") {
        sendRequest(
          PhysicalCount.PostPhysicalCountDetail,
          "POST",
          postPayload.detailPayload,
          getDetails,
          accessToken
        );
      }
    }
  
    useEffect(() => {
      if (isSend == true) {
        sendRequest(
          PhysicalCount.PostPhysicalCount,
          "POST",
          postPayload.formPayload,
          getForm,
          accessToken
        );
      }
    }, [isSend]);

  function getAllTask(data) {
    dispatch(setPhysicalCountForm(data.Result));
  }

  function getDetail(data) {
    dispatch(setPhysicalCountDetails(data.Result));
  }

  const onSubmit = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const assignAction = () => {
    sendRequest(
      PhysicalCount.GetPhysicalCount,
      "POST",
      payload,
      getAllTask,
      accessToken
    );
    sendRequest(
      PhysicalCount.GetPhysicalCountDetails,
      "POST",
      payloadDetail,
      getDetail,
      accessToken
    );
    dispatch(setAssignDrawer(true));
  }

  const payloadPdf = {
    data: {
      PHYCOU_ID: rowData?.PHYCOU_ID,
      OFFSET: "+5:00",
    },
    action: "InventoryWeb",
    method: "PreliminaryPhysicalCountPDFReport",
    username: obj?.form[0].PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
  };

  const convertToPdf = (bytes) => {
    const binaryString = atob(bytes);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const getPdfData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: "Physical Count Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(PhysicalCount.PhysicalCountPDFReport, "POST", payloadPdf, getPdfData, accessToken);
  };

  const onVoidModal = () => {
    sendRequest(
      PhysicalCount.GetPhysicalCount,
      "POST",
      payload,
      getAllTask,
      accessToken
    );
    sendRequest(
      PhysicalCount.GetPhysicalCountDetails,
      "POST",
      payloadDetail,
      getDetail,
      accessToken
    );
    setIsVoid(true)
    setTooltipVisible(false);
  }

  const onVoid = (notes) => {
    dispatch(updateVoid(notes))
    dispatch(readySubGridPayLoad())
    setIsSend(true)
  }


  return (
    <div className="size-full relative">
      <button
        onClick={() => onSubmit()}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          data == "NEW" || data == "Initiated"
            ? "bg-yellow-700"
            : "bg-indigo-500"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {data == "NEW" || data == "Initiated" ? "Assign" : "Assigned"}
        </p>
      </button>
      {isTooltipVisible && (
        <div className="absolute z-[112] text-white  bg-white w-full p-1 text-sm shadow-lg rounded">
          {(data == "NEW" || data == "Initiated") && (
            <div
              onClick={() => assignAction()}
              className={` cursor-pointer bg-yellow-700`}
            >
              <p className="p-1 w-full m-1">Assign</p>
            </div>
          )}
          {(data == "NEW" || data == "Initiated") && <div
            onClick={() => onVoidModal()}
            className={` cursor-pointer bg-[#854d0e] rounded`}
          >
            <p className="p-1 w-full m-1">Void</p>
          </div>}
          <div
            onClick={() => handleChangeToPdf()}
            className={` cursor-pointer bg-[#854d0e] rounded`}
          >
            <p className="p-1 w-full m-1">Report</p>
          </div>
        </div>
      )}
      {isVoid && <VoidNotes
        setOpen={setIsVoid}
        heading={"Physical Count"}
        onVoid={onVoid}
        cancelButtonRef={cancelButtonRef}
      />}
      {pdfModal == true && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )}
    </div>
  );
};

export default PCMainAction;
