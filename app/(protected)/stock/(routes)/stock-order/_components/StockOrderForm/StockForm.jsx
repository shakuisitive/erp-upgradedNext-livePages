"use client";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import React, { useState, useEffect } from "react";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import MoreOption from "../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import ReceivingSelectedModal from "../../../receiving/_components/ReceivingSelectedModal";
import StockOrderLeftForm from "./Header/StockOrderLeftForm";
import StockOrderRightForm from "./Header/StockOrderRightForm";
import StockOrderFormHeader from "./StockOrderFormHeader";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  setSessionId,
  setStockOrderFormDataId,
  stockOrderForm,
} from "../../redux/stockSlice";
import StockGridSku from "../StockOrderSubGrid/stockGridSku/StockGridSku";
import FormGridAction from "./FormGridAction";
import FormStockGridSku from "./FormStockGridSku";
import Tabs from "./../../../../../../../components/misc/pureComponents/tabs/Tabs";
import StSubSlectedModal from "./../StockOrderSubGrid/StSubSlectedModal";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

function StockForm() {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const setFormDataHandler = (e) => {
    setFormData((pre) => {
      pre[e.target.name] = e.target.value;
      return { ...pre };
    });
  };

  const dispatch = useDispatch();

  // dtat for fetching inner form
  let id = useSelector((state) => state.stockSlices?.formIndex);
  let subData = useSelector((state) => state.stockSlices.subData);
  // console.log("This is my id", id?.INVSTO_ID);
  const [data, setData] = useState();
  const [item, setItem] = useState(data);
  const [errorM, setErrorM] = useState();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [isOpenS, setIsOpenS] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [warId, setWarId] = useState(0);
  const [filterData, setFilterData] = useState([]);

  const handleTabClick = (warid, index) => {
    setActiveTab(index);
    setWarId(warid);
    setIsOpenS(false);
    setCheckedItems([]);
  };

  let [error, sendRequest] = useApiFetch();

  useEffect(() => {
    if (checkedItems?.length > 0) {
      //   console.log('kuch data log hoa hai');
      setIsOpenS(true);
    } else {
      setIsOpenS(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {};

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;
  const refresh = useSelector((state) => state.stockSlices.Refresh);
  const isModal = useSelector((state) => state.stockSlices.isModal);

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "SUK",
      slector: "SKU_MANUFACTURE",
      Wid: 220,
    },
    { title: "Name", slector: "DESCRIPTION", Wid: 120 },
    { title: "Location", slector: "LOCATION", Wid: 250 },
    // { title: "check", slector:"", Wid : 20, customComp:CheckBox},
    { title: "Lot", slector: "LOT_NUMBER", Wid: 120 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120, date: true },
    {
      title: "Action",
      slector: "WAR_ID",
      Wid: 120,
      customComp: FormGridAction,
    },
    // { title: "MTH", Wid: 120 },
    { title: "OH Qty", slector: "QTY_ONHAND", Wid: 120 },
    { title: "Qty Recd", slector: "QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector: "QUANTITY", Wid: 120 },
  ]);
  const payload = {
    data: {
      INVSTO_ID: `${id?.INVSTO_ID}`,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  };

  //  const accessToken = localStorage.getItem('tokenSession');
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  function getUniqueWarehouseIds(data) {
    const warehouseMap = new Map();
    data?.forEach((item) => {
      const key = `${item.WAR_ID}_${item.INVENTORY}`;
      if (!warehouseMap.has(key)) {
        warehouseMap.set(key, {
          warId: item.WAR_ID,
          inventory: item.INVENTORY,
        });
      }
    });
    return Array.from(warehouseMap.values());
  }

  function getAllTask(data) {
    setData(data);
    const getDataDet = [
      {
        id: data.Result.Results[0].INVSTO_ID,
        product: data.Result.Table1,
        form: data.Result.Results,
      },
    ];
    dispatch(stockOrderForm(getDataDet));
    dispatch(
      setStockOrderFormDataId({ orderId: data.Result.Results[0].INVSTO_ID })
    );
    const warIds = getUniqueWarehouseIds(data?.Result?.Table1);
    const newTabs = warIds.map((item, index) => {
      if (index === 0) {
        setWarId(item.warId);
      }
      return {
        label: item.inventory,
        warId: item.warId,
        selected: index === 0 ? true : false,
      };
    });
    const sortTabs = newTabs.sort((a, b) => {
      if (a.label === "QT - Quarantine" || a.label === "UN - Unassigned")
        return -1;
      if (b.label === "QT - Quarantine" || b.label === "UN - Unassigned")
        return 1;
      return 0;
    });

    setWarId(sortTabs[0]?.warId);
    setTabs(sortTabs);
  }
  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  useEffect(() => {
    if (refresh == true) {
      setIsOpenS(false);
      setCheckedItems([]);
      sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
    }
  }, [refresh]);
  useEffect(() => {
    if (warId != 0) {
      const filData = data?.Result?.Table1?.filter(
        (item) => item.WAR_ID == warId
      );
      setFilterData(filData);
    }
  }, [warId, data]);

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
  };

  const handleCheckboxChange = (rowI, rowData) => {
    const product = subData[0].product;
    const checkAssigned = product.some(
      (data) => data.USE_ID_ASSIGNED_TO != null
    );
    const warId = checkedItems[0]?.rowData.WAR_ID;
    const checkWar = warId == 3909 || warId == 3024 ? "transfer" : "assign";
    const release = checkedItems[0]?.rowData.LOT_RELEASE_FLAG;
    console.log(checkedItems, "checkItem");
    if (rowData == "all" && checkedAll == false) {
      if (checkAssigned == false) {
        setCheckedAll(true);
        const arr = filterData.map((SData, i) => {
          let obj = {};
          obj = { rowI: i, rowData: SData };

          return obj;
        });
        setCheckedItems(arr);
      } else {
        setEMessage("You can not select all items");
        setIsErrorMessage(true);
      }
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else if (checkedItems.length == 0) {
      if (rowData.USE_ID_ASSIGNED_TO == null) {
        selectionValidation(rowI, rowData);
      } else {
        setEMessage("You can not select assigned product");
        setIsErrorMessage(true);
      }
    } else {
      if (checkWar == "transfer" && release == "Y") {
        if (
          (rowData.WAR_ID == 3909 || rowData.WAR_ID == 3024) &&
          rowData.LOT_RELEASE_FLAG == "Y"
        ) {
          selectionValidation(rowI, rowData);
        } else {
          setEMessage("You can not select release product");
          setIsErrorMessage(true);
        }
      } else if (checkWar == "assign" && release == "Y") {
        if (
          rowData.WAR_ID != 3909 &&
          rowData.WAR_ID != 3024 &&
          rowData.USE_ID_ASSIGNED_TO == null
        ) {
          selectionValidation(rowI, rowData);
        } else {
          setEMessage("You can not select assigned product");
          setIsErrorMessage(true);
        }
      } else if (release == "N") {
        if (rowData.LOT_RELEASE_FLAG == "N") {
          selectionValidation(rowI, rowData);
        } else {
          setEMessage("You can not select transfer product");
          setIsErrorMessage(true);
        }
      }
    }
  };

  const selectionValidation = (rowI, rowData) => {
    if (checked(rowI, rowData)) {
      // Remove the item if it's already checked
      setCheckedItems(
        checkedItems.filter(
          (item) => item.rowI !== rowI && item.rowData !== rowData
        )
      );
    } else {
      // Add the item if it's not checked
      setCheckedItems([...checkedItems, { rowI, rowData }]);
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  const handleTabChange = (tab) => {
    // alert
    // dispatch(tabChangeHandle(tab, props?.screen));
  };
  const handleShowFirstTwoWords = (text) => {
    const words = text.split(" ");
    const firstTwo = words.slice(0, 1).join(" ");
    return firstTwo;
  };

  return (
    <div className=" h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className="flex flex-col border relative lgdesktop:w-[100%]  desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white"
      >
        <StockOrderFormHeader />
        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-auto">
          <div>
            <div className="ml-[60px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex px-4 mr-2 gap-4  ">
                  <div className="w-1/2">
                    <StockOrderLeftForm />
                  </div>
                  <div className="w-1/2">
                    <StockOrderRightForm />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-1 font-normal ml-[60px] mt-4">
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${
                    activeTab === index
                      ? "border-b-customblue border-b-[2px] pb-[3px]"
                      : ""
                  }`}
                >
                  <button
                    className={`flex items-center ${
                      activeTab === index
                        ? "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                        : "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                    }`}
                    onClick={() => handleTabClick(tab.warId, index)}
                  >
                    {/* {tab.icon} */}
                    {handleShowFirstTwoWords(tab.label)}
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="w-full  bg-white grow  p-2 ">
            <GridTable
              row={filterData}
              // row={rowData}
              head={head}
              setHead={setHead}
              GridTitle="Items"
              GridColor="green-400"
              colaps={colaps}
              setColaps={setColaps}
              colapsfunc={colapsfuncComp}
              addButton={false}
              selectedRow={selectedRow}
              MoreOpt={MoreOption}
              MoreOption={MoreOption}
              isChecked={checked}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
        {/* <ReceivingSelectedModal
          isOpen={isOpenS}
          checkedItems={checkedItems?.length}
          closeModal={closeModallSlected}
          checkedItemsData={checkedItems}
        /> */}
        <StSubSlectedModal
          isOpen={isOpenS}
          checkedItems={checkedItems?.length}
          closeModal={closeModallSlected}
          checkedItemsData={checkedItems}
          orderId={data?.Result?.Results[0]?.INVSTO_ID}
        />
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
}

export default StockForm;
