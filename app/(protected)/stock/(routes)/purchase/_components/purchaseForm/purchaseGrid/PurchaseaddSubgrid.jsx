import React, { useState, useEffect, useRef } from "react";
import CreatableDropdown from "../../CreateAbleDropDownTemp";
import { useSelector, useDispatch } from "react-redux";
import { setNewItem } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import {
  getFocused,
  setsubGridActiveNewitems,
} from "../../../redux/Purchase.slice";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
const PurchaseaddSubgrid = ({ title, id }) => {
  console.log('textid', id)
  const [zero, setZero] = useState(false);
  const [disable, setDisable] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const dropdownRef = useRef(null);
  const [skuLotData, setSkuLotData] = useState([]);
  const dispatch = useDispatch();
  const postPurchaseD = useSelector((state) => state.PurchaseSlices.postPurchaseDetail);
  const rowData = useSelector((state) => state.PurchaseSlices.subGridState);
  const skuList = useSelector((state) => state.PurchaseSlices.skuList);
  const selectedVid = useSelector((state) => state.PurchaseSlices.selectedVid);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const venderListData = useSelector((state) => state.PurchaseSlices.venderListData);
  const subGridActiveNewitems = useSelector(
    (state) => state.PurchaseSlices.subGridActiveNewitems
  );
  const NewpostPurchaseOrder = useSelector(
    (state) => state.PurchaseSlices.NewpostPurchaseOrder
  );

  const purchaseOrderDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetPartLotAllList`;

  // useEffect(() => {
  //   const dataPost = () => {
  //     const getAllTaskPOrder = (data) => {
  //       setSkuLotData(data)
  //     };

  //     skuList?.forEach((data) => {
  //       const payload = {
  //         data: {
  //           SEARCH: "",
  //           ORDER: "CODE ASC",
  //           RNUM_FROM: "1",
  //           RNUM_TO: "100",
  //           ACTIVE_FLAG: "Y",
  //           PAR_ID: data?.PAR_ID,
  //           PURGRO_ID: "",
  //           WAR_ID: data?.WAR_ID,
  //           EXPIRY_FLAG: "N",
  //         },
  //         action: "Administration",
  //         method: "GetPartLotAllList",
  //         username: "admin",
  //         type: "rpc",
  //         tid: "144",
  //       };
  //       sendRequest(baseUrl, "POST", payload, getAllTaskPOrder, token);
  //     });
  //   };
  //   dataPost();
  // }, []);

  const handleRefocusDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
      // alert("parent side focus dropdown pressed")
    }
  };
  // useEffect(() => {
  //   if (subGridActiveNewitems == true) {
  //     handleRefocusDropdown();
  //     dispatch(setsubGridActiveNewitems());
  //   }
  // }, [subGridActiveNewitems]);

  const handleCreateOption = (inputValue) => {
    const newOption = {
      value: inputValue,
      label: inputValue,
    };
    setOptions([...options, newOption]);
  };

  const handleChangeOption = (e) => {
    const slected = skuList.filter((data) => data.PAR_ID == e?.value);
    const data = {
      id: slected[0],
    };
    if (zero == false) {
      dispatch(setNewItem(data));
    }
  };
  const [availableOptions, setAvailableOptions] = useState([]);

  useEffect(() => {
    const hasZeroCount = rowData.some((item) => parseInt(item.QUANTITY) === 0);
    // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

    // setLotZero(hasZeroLot)
    setZero(hasZeroCount);
  }, [rowData]);

  const handleSelectedOptionChange = (option) => {
    console.log(option)
    
    const data = {
      id: option,
    };

    if (zero == false) {
      dispatch(setNewItem(data));
      dispatch(getFocused({ title: "Items", focus: false }));
    }
  };

  const handleOnFocus = () => {
    dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    dispatch(getFocused({ title: "Items", focus: false }));
  };

  

  
  const getAvailableOptions = (list) => {
    return skuList.filter((item) => {
      return !rowData?.some(
        (selectedItem) => selectedItem.PART_NUMBER === item.PAR_CODE
      );
    });
  };


  const availableLotList = getAvailableOptions();


  return (
    <div className="m-2">
      {/* <CreatableDropdown slectedOption={handleChangeOption} disableCheck={zero == false ? false : true} value={valSkuList} title={title} handleCreateOption={handleCreateOption}/> */}
       {  (
        <Dropdown
          options={availableLotList}
          optionKey1={["PAR_ID", "DESCRIPTION", "OH_QUANTITY"]}
          optionKey2="PAR_ID"
          onSelectedOptionChanged={handleSelectedOptionChange}
          placeholder={`+ Add Item`}
          inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
          customFocusKey1="ctrlKey"
          customFocusKey="p"
          isDisabled={
            zero == false && (FormStatus == "New" || venderListData.email != '') ||  FormStatus == "Initiated"  ? false : true
          }
          onClearInputValue={true}
          onHandleFocus={handleOnFocus}
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
          isCreateOption={false}
        />
       )
        }
      
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PurchaseaddSubgrid;
