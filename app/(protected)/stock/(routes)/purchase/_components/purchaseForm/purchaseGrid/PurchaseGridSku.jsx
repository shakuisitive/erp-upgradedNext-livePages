import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSplitsGrid,
  openPurchaseGridSplitModal,
  openSubGridSplitModal,
  updatePurchaseSku,
} from "../../../redux/Purchase.slice";
import CreatAbleDropdown from "../../CreateAbleDropDownTemp";
import { FaRegSquarePlus } from "react-icons/fa6";
import SkuModall from "./SkuModall";
import { openSplitModall } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { IoIosArrowDown } from "react-icons/io";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PurchaseDrawer from "../../purchaseRightDrawer/PurchaseDrawer";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import Tooltip from "../../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";
// import PurchaseFormEmail from "../PurchaseFormEmail"

const PurchaseGridSku = ({ data, rowData, index }) => {
  // // console.log(rowData, "order List")
  const [arr, setArr] = useState([]);
  const [arrT, setArrT] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const dropdownRef = useRef(null);
  const handleRefocusDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
      // alert("parent side focus dropdown pressed")
    }
  };

  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  const skuList = useSelector((state) => state.PurchaseSlices.skuList);
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const [isDrawer, setIsDrawer] = useState(false);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const slectedSku = useSelector((state) => state.PurchaseSlices.slectedSku);

  // // console.log('checkUpdatelist' , checkUpdatelist);

  useEffect(() => {
    setArr(skuList);

    // // console.log('skuList check' , skuList);
  }, [skuList, rowData]);
  useEffect(() => {
    if (arr.length > 0) {
      // Check if arr is not empty
      const sortedArr = [...arr]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.PAR_CODE === data) return -1; //
        if (b.PAR_CODE === data) return 1; //
        return 0; // Maintain order for other elements
      });
      setArrT(sortedArr); // Update the state with the sorted array
    }
  }, [arr, data]);

  //   // console.log('check sku index' , data , arr);
  const setChange = (data) => {
    // const slected = skuList.filter((data) => data.PAR_ID == e.target.value),
    // console.log(data, "sku data")
    data = {
      id: data,
      indexR: index,
    };

    dispatch(updatePurchaseSku(data));
    // // console.log('slected sku data' , slected);
  };

  const onClose = () => {
    setOpen(false);
  };

  const openModall = () => {
    // setOpen(true);
    setIsDrawer(true);
    dispatch(openSplitModall(index));
    data = {
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
    };
    dispatch(openPurchaseGridSplitModal(data));
  };

  const handleOnFocus = () => {};

  const handleOnBlur = () => {};

  // // console.log(data, "item name")

  const handleOpenDrawer = () => {
    setIsDrawer(false);
  };
  const handleCloseDrawer = () => {
    setIsDrawer(false);
    dispatch(clearSplitsGrid());
  };

  const tabs = [
    {
      label: "Split Lot",
      content: (
        <PurchaseDrawer
          setEMessage={setEMessage}
          onClose={handleCloseDrawer}
          setIsErrorMessage={setIsErrorMessage}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center pr-2 ">
      {/* <MdOutlineKeyboardArrowDown  className='text-[25px] text-gray-500' /> */}

      {/* <select
        onChange={setChange}
        className="block w-full mt-1 p-2 pr-8 flex-col rounded-md shadow-sm focus:outline-none "
        name=""
        id=""
        disabled={FormStatus == "Initiated" ? false : true}
        value={rowData.PAR_ID != "" ? rowData.PAR_ID : ""}
      >
        {arrT?.map((dataa, i) => {
          return (
            <option
              key={i}
              className={`my-4 text-[16px] font-bold `}
              value={dataa.PAR_ID}
            >
              {dataa.PAR_CODE}
            </option>
          );
        })}
      </select> */}

      <Dropdown
        options={arrT}
        optionKey1="PAR_CODE"
        optionKey2="PAR_ID"
        onSelectedOptionChanged={setChange}
        placeholder="select sku"
        inputClassName="focus:outline-none w-full text-center hover:bg-transparent 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        customFocusKey="s"
        isDisabled={
          FormStatus == "Initiated" || FormStatus == "New" ? false : true
        }
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput={rowData?.PART_NUMBER}
        onHandleBlur={handleOnBlur}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
      {FormStatus == "Initiated" && <IoIosArrowDown />}

      <div
        className={` px-4 border-l h-full  items-center ${
          FormStatus == "Issued to Vendor" ? "flex" : "hidden"
        } `}
      >
        {/* <FaRegSquarePlus
          onClick={openModall}
          className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer "
        /> */}
         {
          rowData?.NON_STOCK_ITEM_FLAG == "N" ? 
          <FaRegSquarePlus
            onClick={openModall}
            className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer "
          /> :  <Tooltip content='non-stock item dont need Lot#'>
                  <FaRegSquarePlus 
                    className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer "
                  />
              </Tooltip>
        }
        <SkuModall
          isOpen={isOpen}
          setOpen={setOpen}
          onClose={onClose}
          cancelButtonRef={cancelButtonRef}
        />
        <RightDrawer
          isOpen={isDrawer}
          setIsDrawer={setIsDrawer}
          onClose={handleCloseDrawer}
          heading={`${rowData.PART_NUMBER} | ${rowData.PART_DESCRIPTION}`}
          tabs={tabs}
        />
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
};

export default PurchaseGridSku;
