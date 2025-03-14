import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import MoreOption from "./../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import { GoEye, GoHome } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import LotNumber from "./LotNumber";
import PhysicalCountQTY from "./PhysicalCountQTY";
import PhysicalCountFormHeader from "./PhysicalCountFormHeader";
import {
  Administration,
  PhysicalCount,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  setLoader,
  setLocations,
  setPhysicalCountDetails,
  setPhysicalCountForm,
  updateNotes,
  updatePCEmpty,
} from "../../redux/physicalCountSlice";
import moment from "moment";
import PCAdjustment from "./PCAdjustment";
import SecLocSelect from "./SecLocSelect";
import BinLocSelect from "./BinLocSelect";
import RowLocSelect from "./RowLocSelect";
import ItemSplit from "./ItemSplit";

const PhysicalCountForm = () => {
  const [form, setForm] = useState();
  const [detail, setDetail] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [physicalCountList, setPhysicalCountList] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  let PCIndex = useSelector((state) => state.physicalCount.PCIndex);
  let physicalCountForm = useSelector(
    (state) => state.physicalCount.physicalCountForm[0]
  );
  let physicalCountDetails = useSelector(
    (state) => state.physicalCount.physicalCountDetails
  );

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const payload = {
    data: {
      PHYCOU_ID: `${PCIndex?.PHYCOU_ID}`,
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
      PHYCOU_ID: `${PCIndex?.PHYCOU_ID}`,
      OFFSET: "+5:00",
      ORDER: "ORDER BY 1 DESC",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCountDetails",
    type: "rpc",
    tid: "144",
    username: "admin",
  };

  const getLocations = (res) => {
    if (res?.CODE === "SUCCESS") {
      let secOptions = [];
      let rowOptions = [];
      let binOptions = [];

      let locList = res?.Result?.Results.map((item) => {
        let location = item.LOCATION;
        const hasAlphabets = /[A-Za-z]{2,}/.test(location);
        if (location === "SOSROSBOS") {
          location = "OS";
        } else if (hasAlphabets) {
          location = location.replace(/[SRB]/g, "");
        }
        if (!secOptions.includes(item?.SECTION)) {
          secOptions.push(item?.SECTION);
        }
        if (!rowOptions.includes(item?.ROW)) {
          rowOptions.push(item?.ROW);
        }
        if (!binOptions.includes(item?.BIN)) {
          binOptions.push(item?.BIN);
        }
        return { ...item, value: item.LOCATION, label: location };
      });

      const customSort = (a, b) => {
        if (a === "OS") return 1; // "OS" goes to the end
        if (b === "OS") return -1; // "OS" goes to the end

        // Sort numbers in ascending order
        return a - b;
      };

      secOptions = secOptions.sort(customSort);
      rowOptions = rowOptions.sort(customSort);
      binOptions = binOptions.sort(customSort);
      dispatch(
        setLocations({
          sec: secOptions,
          row: rowOptions,
          bin: binOptions,
          loc: locList,
        })
      );
    }
  };

  function getAllTask(data) {
    setForm(data.Result[0]);
    dispatch(setPhysicalCountForm(data.Result));
    dispatch(setLoader(false));
    const warehouseLocationPayload = {
      action: "Administration",
      data: {
        ACTIVE_FLAG: "Y",
        SEARCH: "",
        ORDER: "LOCATION ASC",
        RNUM_FROM: "1",
        RNUM_TO: "100000",
        OFFSET: "",
        WAR_ID: data.Result[0].WAR_ID,
      },
      method: "GetWarehouseLocationList",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    sendRequest(
      Administration.GetWareHouseLocations,
      "POST",
      warehouseLocationPayload,
      getLocations,
      accessToken
    );
  }

  function getDetail(data) {
    setDetail(data.Result);
    dispatch(setPhysicalCountDetails(data.Result));
  }

  useEffect(() => {
    dispatch(setLoader(true));
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
  }, []);

  const initialHead = [
    { title: "", slector: "", Wid: 0 },
    { title: "Sec", slector: "SECTION", customComp: SecLocSelect, Wid: 40 },
    { title: "Row", slector: "ROW_NUMBER", customComp: RowLocSelect, Wid: 40 },
    { title: "Bin", slector: "BIN_NUMBER", customComp: BinLocSelect, Wid: 40 },
    { title: "Item", slector: "PART_NUMBER", customComp: ItemSplit, Wid: 250 },
    { title: "Product", slector: "SKU_MANUFACTURE", Wid: 20 },
    { title: "OH QTY", slector: "ONHAND_QTY", Wid: 120 },
    { title: "LOT", slector: "LOT_NUMBER", customComp: LotNumber, Wid: 120 },
    {
      title: "Count",
      slector: "COUNT_QTY",
      customComp: PhysicalCountQTY,
      Wid: 120,
    },
    {
      title: "Adjustment",
      slector: "ADJUSTMENT",
      customComp: PCAdjustment,
      Wid: 120,
    },
  ];

  const [head, setHead] = useState(initialHead);
  const [hideOnhandQty, setHideOnhandQty] = useState(false);

  useEffect(() => {
    // Create a new array based on initialHead and hideOnhandQty
    const updatedHead = initialHead.map((column) => {
      if (column.slector === "ONHAND_QTY") {
        // If hideOnhandQty is true, omit the ONHAND_QTY column
        if (hideOnhandQty) {
          return { ...column, hidden: true }; // Mark as hidden
        } else {
          return column; // Show normally
        }
      }
      return column; // Return other columns as they are
    });

    // Update the state with the modified head array
    setHead(updatedHead);
  }, [hideOnhandQty]);

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };
  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
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
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  const handleTabClick = (warid, index) => {
    setActiveTab(index);
    // setWarId(warid);
    // setIsOpenS(false);
    // setCheckedItems([]);
  };

  const tabs = [
    {
      label: "Overview",
      icon: <GoHome />,
    },
    {
      label: "History",
      icon: "",
    },
  ];

  const updateNote = (e) => {
    dispatch(updateNotes(e.target.value));
  };

  const listPayload = {
    data: {
      WAR_ID: physicalCountForm?.WAR_ID,
      NON_STOCK_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetAutoPCDetailList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const getList = (data) => {
    if (data.CODE === "SUCCESS") {
      const physicalDetail = data.Result.map((items) => {
        return {
          ...items,
          PART_NUMBER: items.PART_CODE,
          ONHAND_QTY: items.OH_QTY,
          PHYCOU_ID: physicalCountForm.PHYCOU_ID,
        };
      });
      setPhysicalCountList(physicalDetail);
      dispatch(setPhysicalCountDetails(physicalDetail));
    }
  };

  const generateList = () => {
    sendRequest(
      PhysicalCount.GetAutoPCDetailList,
      "POST",
      listPayload,
      getList,
      accessToken
    );
  };

  const toggleOnhandQtyVisibility = () => {
    setHideOnhandQty(!hideOnhandQty);
    if (hideOnhandQty == true) {
      setHideOnhandQty(false);
      const checkCon = {
        oh: "N",
        ee: "N",
      };
      dispatch(updatePCEmpty(checkCon));
    } else {
      setHideOnhandQty(true);
      const checkCon = {
        oh: "Y",
        ee: "Y",
      };
      dispatch(updatePCEmpty(checkCon));
    }
  };

  return (
    <div className="flex h-[80vh] overflow-hidden gap-2">
      <div className="lg:w-9/12 flex flex-col bg-white border border-gray-300 rounded">
        <PhysicalCountFormHeader />
        <div className=" bg-white pr-2 overflow-scroll">
          <GridTable
            head={head}
            setHead={setHead}
            row={physicalCountList}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfuncComp}
            GridTitle="Items"
            GridColor="#4ade80"
            addButton={false}
            selectedRow={selectedRow}
            MoreOpt={MoreOption}
            MoreOption={MoreOption}
            isChecked={checked}
            checkBoxShow={false}
            moreOptShow={false}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
      <div className="lg:w-1/4 bg-white border border-gray-300 rounded">
        <div className="flex flex-col p-3">
          <div className="flex justify-between items-center">
            <div className="flex">
              <div className="border border-gray-300 rounded-sm flex justify-center items-center px-2 h-8 mr-1">
                <span className="text-[14px] font-normal">Edit</span>
              </div>
              <div className="border border-gray-300 rounded-sm flex justify-center items-center px-2 h-8">
                <GoEye className="mr-2 text-[14px] font-normal" />
                <span className="text-[14px] font-normal">Preview</span>
              </div>
              <GrDocumentText size={32} />
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-customblack text-[24px] leading-[24px] font-normal ">
                {physicalCountForm?.PC_NUMBER}
              </h2>
              <p className="text-[#6b7280] text-[14px] leading-[24px] font-normal text-right">
                {moment(physicalCountForm?.PC_DATE).format("DD / MM / YYYY")}
              </p>
            </div>
          </div>
          <div className="flex gap-1 font-normal mt-4">
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
                    onClick={() => handleTabClick(tab.label, index)}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="w-full border border-gray-300 mt-2" />
          {physicalCountDetails.length == 0 && (
            <div
              onClick={generateList}
              className="bg-[#2596be] w-full flex items-center justify-center mt-2 rounded-sm text-gray-300 py-1"
            >
              Generate Physical Count
            </div>
          )}
          <div className="flex flex-col mt-2">
            <span className="text-customblack text-[14px]">Status</span>
            <div className="bg-[#28b44c] w-full flex items-center justify-center mt-2 rounded-sm text-white py-1">
              {physicalCountForm?.PC_STATUS}
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-customblack text-[14px]">Priority</span>
            <div className="bg-[#ffcc0c] w-full flex items-center justify-center mt-2 rounded-sm text-white py-1 h-7"></div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-start mt-6">
              <div className="flex items-center">
                <input
                  onClick={toggleOnhandQtyVisibility}
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  for="checked-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Exclude Blank
                </label>
              </div>
              <div className="flex items-center mt-6">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Blank Physical
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-start mt-6">
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Exclude Empty Rows
                </label>
              </div>

              <div className="flex items-center mt-6">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Include Expired
                </label>
              </div>
            </div>
          </div>
          <div className="w-full border border-gray-300 mt-6" />
          <div className="mt-6">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes"
              value={physicalCountForm?.NOTES}
              onChange={updateNote}
            />
          </div>
          <div className="flex justify-between mt-6">
            <div className="border-b border-gray-300">Completed By</div>
            <div className="border-b border-gray-300">Completed By</div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-1/2">Signature</div>
            <div className="w-1/2">
              <textarea
                id="message"
                rows="2"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalCountForm;
