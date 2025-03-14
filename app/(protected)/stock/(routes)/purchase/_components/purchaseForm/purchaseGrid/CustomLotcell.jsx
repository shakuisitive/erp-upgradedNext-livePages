"use client";

import { useState, useEffect, useRef } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePurchaseLot,
  onNextFocus,
  lotCreateToggle,
  setIsRemoveLot,
  formSplitCreateToggle,
} from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import Tooltip from "../../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";
import { FaCircleInfo } from "react-icons/fa6";
import { FcExpired } from "react-icons/fc";
import LotCreateDrawer from "../../PurchaseSubGrid/LotCreateDrawer";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import Popover from "../../../../../../../../components/misc/pureComponents/popovers/Popover";

const CustomLotcell = ({ data, rowData, index }) => {
  console.log(rowData, 'row data check')
  let [error, sendRequest] = useApiFetch();
  // const [lotList, setLotSlist] = useState([]);
  const [arr, setArr] = useState([]);
  const [color, setColor] = useState();
  const [isPopup, setIsPopup] = useState(false);
  const [isRemove, setIsRemove] = useState(true);
  const dispatch = useDispatch();
  const focRef = useRef(null);

  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );
  const lotCreate = useSelector((state) => state.PurchaseSlices.formSplitLotCreate);
  const isRemoveLot = useSelector((state) => state.PurchaseSlices.isRemoveLot);
  const dropdownRef = useRef(null);

  // console.log('check lot change' , color);

  const handleRefocusDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
      // alert("parent side focus dropdown pressed")
    }
  };

  useEffect(() => {
    if (
      purchseSubGridActF.index == index &&
      purchseSubGridActF.field == "lot"
    ) {
      // // console.log("check orderQuantity" , purchseSubGridActF , FormStatus );

      // event.preventDefault();

      handleRefocusDropdown();
    }
  }, [purchseSubGridActF]);
  //  const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
  // // console.log('checkUpdatelist' , lotList);
  const payload = {
    data: {
      PURORD_ID: rowId,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  // const token = localStorage.getItem("tokenSession");
  let token = "";
  useEffect(() => {
    token =
      typeof window !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
  }, []);

  // function getAllTask(data) {
  //   setLotSlist(data.Result);
  //   // // console.log("get lot list ", data.Result);

  //   // dispatch(subGridset(data.Result.INV_PURCHASE_ORDER_DETAILS_WV))
  //   //   setFormData(data.Result.INV_PURCHASE_ORDERS_WV[0])
  // }
  // useEffect(() => {
  //   sendRequest(apiUrl, "POST", payload, getAllTask, token);
  // }, []);

  // const setChange = (e) => {
  //  let expDate = "";
  //   lotList.map((data) => {
  //     if (data.LOT_NUMBER == e.target.value) {
  //       expDate = data.EXPIRY_DATE;
  //     }
  //   });
  //   data = {
  //     id: e.target.value,
  //     indexR: index,
  //     exp: expDate
  //   };

  //   dispatch(updatePurchaseLot(data));

  //   // // console.log('check lot change' , e.target.value);
  // };

  useEffect(() => {
    if (lotList.length > 0) {
      // Check if arr is not empty
      const sortedArr = [...lotList]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.LOT_NUMBER === rowData.LOT_NUMBER) return -1; // 'Ali' comes before 'Ahmad' and 'Raza'
        if (b.LOT_NUMBER === rowData.LOT_NUMBER) return 1; // 'Ali' comes before 'Ahmad' and 'Raza'
        return 0; // Maintain order for other elements
      });
      setArr(sortedArr); // Update the state with the sorted array
    }
  }, [lotList, data]);

  useEffect(() => {
    let colFil = lotList.filter(
      (data) => data.LOT_NUMBER == rowData.LOT_NUMBER
    );
    setColor(colFil[0]?.PURCHASE_GROUP_COLOR);
    // console.log('check color in lot ' , colFil[0]?.PURCHASE_GROUP_COLOR    , 'colfil' , colFil , 'rowDara' ,  rowData.LOT_NUMBER , 'lotList' , lotList );
  }, [lotList]);

  const setChange = (e) => {
    setColor(e.PURCHASE_GROUP_COLOR);
    let expDate = "";
    let invId = "";
    lotList.forEach((dataa) => {
      if (dataa.LOT_NUMBER === e.LOT_NUMBER) {
        expDate = dataa.EXPIRY_DATE;
        invId = dataa.INVPARLOT_ID;
      }
    });

    const updatedData = {
      id: e.LOT_NUMBER,
      parId: rowData?.PAR_ID,
      exp: expDate,
      inv: invId,
    };


    //console.log("updatedData", updatedData);

    dispatch(updatePurchaseLot(updatedData));

    dispatch(onNextFocus({ index: index + 1, field: "lot" }));
  };

  const setNewLot = (lotData) => {
    let expDate = "";
    let invId = "";
    lotData.data.forEach((dataa) => {
      if (dataa.LOT_NUMBER === lotData.newLot) {
        expDate = dataa.EXPIRY_DATE;
        invId = dataa.INVPARLOT_ID;
      }
    });

    const updatedData = {
      id: lotData.newLot,
      parId: rowData?.PAR_ID,
      exp: expDate,
      inv: invId,
    };


    dispatch(updatePurchaseLot(updatedData));

    dispatch(onNextFocus({ index: index + 1, field: "lot" }));
  };

  const handleOnFocus = () => {};
  const handleCloseDrawer = () => {
    dispatch(formSplitCreateToggle(false));
  };
  const tabs = [
    {
      label: "Create Lot",
      content: <LotCreateDrawer rowData={rowData} newLotNumber={setNewLot} />,
    },
  ];

  const createNewLot = (option) => {
    dispatch(formSplitCreateToggle(true));
  };

  const handleRemoveLot = () => {
    let colFil = lotList.filter(
      (data) => data.LOT_NUMBER !== rowData.LOT_NUMBER
    );
    if(colFil) {
      dispatch(setIsRemoveLot(false));
    }
  };
  

  const handleOnBlur = () => {};
  return (
    <div className="w-full h-full flex relative justify-between bg-[#E1EFF2] pr-[3px] items-center">
      <div
        style={{ backgroundColor: `${color}` }}
        className={`p-[2px] mr-[2px] h-full`}
      ></div>
            
        <>
          {rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
            <Dropdown
              options={arr}
              optionKey1="LOT_NUMBER"
              optionKey2="LOT_NUMBER"
              onSelectedOptionChanged={setChange}
              placeholder="select lot"
              inputClassName="focus:outline-none  hover:bg-transparent 
              hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-center"
              dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
              customFocusKey="p"
              isDisabled={FormStatus == "Issued to Vendor" || FormStatus == "Partially Ready for Receiving" ? false : true}
              onClearInputValue={false}
              onHandleFocus={handleOnFocus}
              onDefaultInput={rowData?.LOT_NUMBER}
              onHandleBlur={handleOnBlur}
              forwardedRef={dropdownRef}
              onNewOption={createNewLot}
              isCreateOption={true}
            />
          ) : (
           <div className="flex items-center justify-center w-full">
             <Tooltip content="non-stock item dont need Lot#">
              <FaCircleInfo  className=" fill-blue-700"/>
            </Tooltip>
           </div>
          )}
        </>
        <div className="ml-1">
           {
            (
              <span onClick={() => setIsPopup(true)} className={`cursor-pointer ${ !rowData?.LOT_NUMBER && 'invisible'}`}>
              <FaCircleInfo  className=" fill-blue-700"/>
            </span>
            )
           }
           
          {isPopup && <Popover rowData={rowData} setIsPopup={setIsPopup} />}
        </div>

      <div>
        <RightDrawer
          isOpen={lotCreate}
          onClose={handleCloseDrawer}
          heading="Purchase Order"
          tabs={tabs}
        />
      </div>
    </div>
  );
};

export default CustomLotcell;
