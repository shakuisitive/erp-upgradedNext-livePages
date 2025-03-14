import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoIosArrowDown,
  IoIosRemoveCircleOutline,
 
} from "react-icons/io";

import useApiFetch from "./../../../../../../../customHook/useApiFetch";
import { PhysicalCount } from "./../../../../../../../components/misc/pureComponents/constants/apiConstant";
import VoidNotes from "../../../../../../../components/misc/pureComponents/modal/VoidNotes";

const FormBtnDropdown = ({ onApply, onVoid }) => {
  let [error, sendRequest] = useApiFetch();
  const tooltipRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  

  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

 

  const voidModal = () => {
    setIsVoid(true);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md bg-cyan-400 hover:bg-cyan-500 ${
          TransferForm?.TRANSFER_STATUS === "Completed"
            ? "pointer-events-none opacity-50"
            : ""
        }`}
      >
        <div
          className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle "
          onClick={onApply}
        >
          <span className="font-medium  cursor-pointer">Finalize</span>
        </div>
        <div
          className="text-white flex items-center px-2 cursor-pointer "
          onClick={handleIsOpen}
        >
          <IoIosArrowDown className="text-[18px] " />
        </div>
      </div>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[200px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="">
            {TransferForm?.TRANSFER_STATUS == "NEW" && (
              <div
                onClick={voidModal}
                className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center flex`}
              >
                <IoIosRemoveCircleOutline />
                Void
              </div>
            )}
          </div>
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
      {/* {pdfModal == true && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )} */}
    </div>
  );
};

export default FormBtnDropdown;
