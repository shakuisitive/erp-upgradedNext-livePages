import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { Administration } from "../../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../../../customHook/useApiFetch";
import { setKitSubGrid, updateKitItemLot } from "../../../../../redux/pmSlice";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";

const PMKitLotNum = ({ rowData, data }) => {
  const [lotList, setLotList] = useState([]);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const selectedKitWAR_ID = useSelector(
    (state) => state.pmSlices.selectedKitWAR_ID
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();

  const payloadLotList = {
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "Y",
      PAR_ID: rowData.PAR_ID,
      PURGRO_ID: "",
    },
    action: "Administration",
    method: "GetPartLotList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handlePrtlotlist = (data) => {
    if (data.CODE == "SUCCESS") {
      const filteredData = data?.Result?.filter(
        (item) => item.WAR_ID == selectedKitWAR_ID
      );

      setLotList(filteredData);
    }
  };
  useEffect(() => {
    if (rowData.PAR_ID) {
      sendRequest(
        Administration.GetPartLotList,
        "POST",
        payloadLotList,
        handlePrtlotlist,
        token
      );
    }
  }, []);
  const handleSelectedOptionChange = (option) => {
    console.log('option', option)
    const data = {
      id: rowData.PAR_ID,
      InvParLOtId: option.INVPARLOT_ID,
      LOT_NUMBER: option.LOT_NUMBER,
      OH_QTY_LOT: option.OH_QTY_LOT,
      AVL_QTY_LOT: option.AVL_QTY_LOT,
      EXPIRY_DATE: option.EXPIRY_DATE,
    };
    dispatch(updateKitItemLot(data));
  };
  const handleOnFocus = () => {};
  const handleOnBlur = () => {};
  return (
    <>
      {
        rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
       <div> 
      <Dropdown
        options={lotList}
        optionKey1="LOT_NUMBER"
        optionKey2="INVPARLOT_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder={`+ Add Item`}
        inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        isDisabled={false}
        onClearInputValue={true}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput={data ? data : ""}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
      </div>  
        ) : (
          <div className="flex items-center justify-center w-full">
          <Tooltip content="non-stock item dont need Lot#">
           <FaCircleInfo  className=" fill-blue-700"/>
         </Tooltip>
        </div>
        )
      }
    </>
  );
};

export default PMKitLotNum;
