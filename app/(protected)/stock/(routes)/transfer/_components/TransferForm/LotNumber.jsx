import React, { useRef, useState } from "react";
import Tooltip from "../../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import { FaCircleInfo } from "react-icons/fa6";
import Popover from "../../../../../../../components/misc/pureComponents/popovers/Popover";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLot } from "../../redux/TransferSlice";

const LotNumber = ({ data, rowData, index }) => {
  const focRef = useRef(null);
  const [isPopup, setIsPopup] = useState(false);
  const dispatch = useDispatch();

  const setPopup = () => {
    setIsPopup(!isPopup);
  };
  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );

  const LotList = useSelector((state) => state.TransferSlice.LotList);

  const handleOnFocus = () => {};

  const handleOnBlur = () => {
  };

  const setChange = (e) => {
    const data = {
      LN: e.LOT_NUMBER,
      ED: e.EXPIRY_DATE,
      LI: e.INVPARLOT_ID,
      OH: e.OH_QUANTITY,
      ind: index
    };
    dispatch(UpdateLot(data));
  };

  return (
    <div className="w-full h-full flex relative justify-between bg-[#E1EFF2] pr-[3px] items-center">
      {/* <div
        style={{ backgroundColor: `${color}` }}
        className={`p-[2px] mr-[2px] h-full`}
      ></div> */}

      <>
        {rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
          <Dropdown
            options={LotList}
            optionKey1="LOT_NUMBER"
            optionKey2="LOT_NUMBER"
            onSelectedOptionChanged={setChange}
            placeholder="select lot"
            inputClassName="focus:outline-none w-full hover:bg-transparent 
          over:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-center"
            dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
            customFocusKey="p"
            isDisabled={
              TransferForm.TRANSFER_STATUS == "NEW"
                ? false
                : TransferForm.TRANSFER_STATUS == "Initiated"
                ? false
                : true
            }
            onClearInputValue={false}
            onHandleFocus={handleOnFocus}
            onDefaultInput={rowData?.LOT_NUMBER}
            onHandleBlur={handleOnBlur}
            forwardedRef={focRef}
            isCreateOption={true}
          />
        ) : (
          <div className="flex items-center justify-center w-full">
            <Tooltip content="non-stock item dont need Lot#">
              <FaCircleInfo />
            </Tooltip>
          </div>
        )}
      </>
      <div className="ml-1">
        {
          <span
            onClick={setPopup}
            className={`cursor-pointer ${!rowData?.LOT_NUMBER && "invisible"}`}
          >
            <FaCircleInfo />
          </span>
        }

        {isPopup && <Popover rowData={rowData} setIsPopup={setIsPopup} />}
      </div>
    </div>
  );
};

export default LotNumber;
