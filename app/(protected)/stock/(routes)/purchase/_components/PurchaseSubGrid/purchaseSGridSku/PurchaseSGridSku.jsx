import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegSquarePlus } from "react-icons/fa6";
import {
  openSubGridSplitModal,
  setNewsplit,
  setSplitPostPurchaseDetail,
  setSplitPostPurchaseDetais,
  splitDrawerClose,
  updatePurchaseSku,
} from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import SkuModal from "./SkuModal";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PurchaseRightDrawer from './PurchaseRightDrawer';
import Tooltip from "../../../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const PurchaseSGridSku = ({ data, rowData, index, obj }) => {
  const [arr, setArr] = useState([]);
  const [arrT, setArrT] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(true);

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
  // console.log(obj, "check obj")
  const FormStatus = obj?.statusId;
  const slectedSku = useSelector((state) => state.PurchaseSlices.slectedSku);
  const splitDrawer = useSelector((state) => state.PurchaseSlices.splitDrawer);

  // // console.log('checkUpdatelist' , checkUpdatelist);


  useEffect(() => {
    setIsDrawer(splitDrawer)
  }, [splitDrawer]);

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
    //setOpen(true);
    data = {
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
    };
    dispatch(openSubGridSplitModal(data));
    // setIsDrawer(splitDrawer);
  };

  const handleOnFocus = () => {};

  const handleOnBlur = () => {};

  // // console.log(data, "item name")

  const [isDrawer, setIsDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setIsDrawer(false);
  };
  const handleCloseDrawer = () => {
    dispatch(setNewsplit([]));
    dispatch(setSplitPostPurchaseDetail([]))
    dispatch(setSplitPostPurchaseDetais([]))
    //setIsDrawer(false);
    dispatch(splitDrawerClose())
  };

  const tabs = [
    {
      label: "Split Lot",
      content: <PurchaseRightDrawer />,
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
        <SkuModal
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
      </div>
    </div>
  );
};

export default PurchaseSGridSku;
