import React, { useState, useEffect, useRef } from "react";
// import CreatableDropdown from '../../CreateAbleDropDownTemp'
import { useSelector, useDispatch } from "react-redux";
import { setNewItem, setSubNewItem, skuFilterData } from "../../redux/Purchase.slice";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import {
  getFocused,
  setsubGridActiveNewitems,
} from "../../redux/Purchase.slice";
const PurchaseAddSubGrid = ({ title, id }) => {
  const [zero, setZero] = useState(false);
  const [disable, setDisable] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const valSkuList = useSelector((state) => state.PurchaseSlices.valSkuList);
  const subData = useSelector((state) => state.PurchaseSlices.subData);
  const skuList = useSelector((state) => state.PurchaseSlices.skuList);
  const filterSkuData = useSelector((state) => state.PurchaseSlices.filterSkuData);
  const selectedVid = useSelector((state) => state.PurchaseSlices.selectedVid);
  const selectedSubOrderId = useSelector(
    (state) => state.PurchaseSlices.selectedSubOrderId
  );
  const subGridActiveNewitems = useSelector(
    (state) => state.PurchaseSlices.subGridActiveNewitems
  );
  const Ven_id = useSelector((state) => state.PurchaseSlices.newPurchaseForm);
  const subGridStatus = useSelector((state) => state.PurchaseSlices.subGridStatus);
  const VEN_ID = Ven_id.data.VEN_ID;

  const purchaseOrder = subData.filter(item => item.id === id);
  const purchaseOrderDetails =  purchaseOrder[0]?.product;
  // const subData = useSelector((state) => state.PurchaseSlices.subData);
  //console.log('action check subData' , subData);
  // // console.log('check active true VEN ID' ,VEN_ID);
  // // console.log('check active true VEN option' , Ven_option);
  // // console.log('check active true' , skuList);
  const handleRefocusDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
      // alert("parent side focus dropdown pressed")
    }
  };
  useEffect(() => {
    if (subGridActiveNewitems == true) {
      handleRefocusDropdown();
      dispatch(setsubGridActiveNewitems());
    }
  }, [subGridActiveNewitems]);

  const handleCreateOption = (inputValue) => {
    const newOption = {
      value: inputValue,
      label: inputValue,
    };
    setOptions([...options, newOption]);
  };

  const handleChangeOption = (e) => {
    // // console.log("if it running check " , e);
    const slected = skuList.filter((data) => data.PAR_ID == e?.value);
    const data = {
      id: slected[0],
    };
    if (zero == false) {
      dispatch(setNewItem(data));
    }
  };


  useEffect(() => {
    subData?.forEach((item) => {
      if (item.id == selectedSubOrderId) {
        item.product.forEach((pro) => {
          if (pro.QUANTITY == 0) {
            setZero(true);
            
          } else {
            setZero(false);
          }
        });
      }
    });
    // const hasZeroCount = purchaseOrder.product != undefined && purchaseOrder.product.some((item) => {parseInt(item.QUANTITY) == 0});
    // // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);
    // console.log(hasZeroCount, "Zero and rowdata");
    // // setLotZero(hasZeroLot);
    // setZero(hasZeroCount);
    // // console.log('// console if has zero' , hasZeroLot , hasZeroCount , dataDetails);
  }, [subData]);


  const handleSelectedOptionChange = (option) => {
    const data = {
      id: option,
      Pid: id,
    };

    //   console.log('check log for change drop down' , data);

    if (zero == false) {
      console.log(data, "Data")
      dispatch(setSubNewItem(data));
      // dispatch(getFocused({title:"Items" , focus:false}))
    }
  };

  const handleOnFocus = () => {
    // // console.log('log focus');
    dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
    dispatch(getFocused({ title: "Items", focus: false }));
  };
  

  const getAvailableOptions = (list) => {
    return skuList.filter((item) => {
      return !purchaseOrderDetails?.some(
        (selectedItem) => selectedItem.PART_NUMBER === item.PAR_CODE
      );
    });
  };

  const availableLotList = getAvailableOptions();

  return (
    <div className="m-2">
      {
       ( subGridStatus == "Initiated" || subGridStatus == "New" ) && zero == false ?
      <Dropdown
        options={availableLotList}
        optionKey1={["PAR_ID", "DESCRIPTION", "OH_QUANTITY"]}
        optionKey2="PAR_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Add Item"
        inputClassName="w-full  focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[280px] bg-white border border-customGray  rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        isDisabled={zero == false ? false : true}
        onClearInputValue={true}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      /> : <span className="line-through text-gray-400">+ Add Item</span>
      }
    </div>
  );
};

export default PurchaseAddSubGrid;