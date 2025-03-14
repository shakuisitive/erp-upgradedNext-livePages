import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import MoreOption from "../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import { GoEye, GoHome } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import LotNumber from "./LotNumber";
import TransferQTY from "./TransferQTY";
import TransferFormHeader from "./TransferFormHeader";
import {
  Administration,
  PhysicalCount,
  Transfer,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  setLoader,
  setLocations,
  setTransferDetails,
  setTransferForm,
  updateNotes,
  
} from "../../redux/TransferSlice";
import moment from "moment";
import SecLocSelect from "./SecLocSelect";
import BinLocSelect from "./BinLocSelect";
import RowLocSelect from "./RowLocSelect";
import WarehouseTo from "./WarehouseTo";

const TransferForm = () => {
  const [form, setForm] = useState();
  const [detail, setDetail] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  let PCIndex = useSelector((state) => state.TransferSlice.PCIndex);
  let TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  let transferDetails = useSelector(
    (state) => state.TransferSlice.transferDetails
  );

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const payload = {
    data: {
      INVTRA_ID: `${PCIndex?.INVTRA_ID}`,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
    username: "admin",
  };

  function getAllTask(data) {
    setForm(data.Result.Results);
    dispatch(setTransferForm(data.Result.Results));
    setDetail(data.Result.Table1);
    dispatch(setTransferDetails(data.Result.Table1));
  }

  useEffect(() => {
    transferDetails?.forEach((item, index) => {
      const warehouseLocationPayload = {
        action: "Administration",
        data: {
          ACTIVE_FLAG: "Y",
          SEARCH: "",
          ORDER: "LOCATION ASC",
          RNUM_FROM: "1",
          RNUM_TO: "100000",
          OFFSET: "",
          WAR_ID: item.war_id_to,
        },
        method: "GetWarehouseLocationList",
        tid: "144",
        type: "rpc",
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

            return a - b;
          };

          secOptions = secOptions.sort(customSort);
          rowOptions = rowOptions.sort(customSort);
          binOptions = binOptions.sort(customSort);

          const LocData = {
            ind: index,
            sec: secOptions,
            row: rowOptions,
            bin: binOptions,
            loc: locList,
          };

          dispatch(setLocations(LocData));
        }
      };
      sendRequest(
        Administration.GetWareHouseLocations,
        "POST",
        warehouseLocationPayload,
        getLocations,
        accessToken
      );
    });
  }, [transferDetails?.length]);

  useEffect(() => {
    // dispatch(setLoader(true));
    sendRequest(
      Transfer.GetInvTransfer,
      "POST",
      payload,
      getAllTask,
      accessToken
    );
  }, []);

  const initialHead = [
    { title: "SKU", slector: "PART_CODE", Wid: 200 },
    // { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 150 },
    { title: "Lot#", slector: "LOT_NUMBER", Wid: 120 },
    // { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120 },
    { title: "Sec", slector: "SHELF_FROM_LOC", Wid: 30 },
    { title: "Row", slector: "RACK_FROM_LOC", Wid: 30 },
    { title: "Bin", slector: "BIN_NUMBER_FROM_LOC", Wid: 30 },
    { title: "Warehouse Frm", slector: "INVENTORY_FROM", Wid: 80 },

    { title: "OH QTY", slector: "ONHAND_QTY_FROM", Wid: 40 },
    { title: "Avl QTY", slector: "AVL_QTY_FROM", Wid: 40 },
    {
      title: "Warehouse To",
      slector: "INVENTORY_TO",
      Wid: 80,
      customComp: WarehouseTo,
    },
    {
      title: "Sec",
      slector: "SHELF_TO_LOC",
      Wid: 40,
      customComp: SecLocSelect,
    },
    { title: "Row", slector: "RACK_TO_LOC", Wid: 40, customComp: RowLocSelect },
    {
      title: "Bin",
      slector: "BIN_NUMBER_TO_LOC",
      Wid: 40,
      customComp: BinLocSelect,
    },
    { title: "OH QTY", slector: "ONHAND_QTY_FROM", Wid: 40 },
    { title: "Avl QTY", slector: "AVL_QTY_FROM", Wid: 40 },
    {
      title: "Qty Transfer",
      slector: "QUANTITY",
      customComp: TransferQTY,
      Wid: 40,
    },
  ];

  const [head, setHead] = useState(initialHead);
  const [hideOnhandQty, setHideOnhandQty] = useState(
    TransferForm?.ONHAND_BLANK_FLAG == "Y" ? true : false
  );

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

  


  return (
    <div className="flex h-[80vh] overflow-hidden gap-2">
      <div className="lg:w-9/12 flex flex-col bg-white border border-gray-300 rounded">
        <TransferFormHeader />
        <div className=" bg-white pr-2 overflow-scroll h-[74vh]">
          <GridTable
            head={head}
            setHead={setHead}
            row={transferDetails}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfuncComp}
            GridTitle="Items"
            GridColor="#4ade80"
            addButton={false}
            // GriddFooterAdd={AddTransfer}
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
              <h2 className="text-customblack text-[14px] font-bold leading-[24px]  ">
                {TransferForm?.TRANSFER_NUMBER}
              </h2>
              <p className="text-[#6b7280] text-[14px] leading-[24px] font-normal text-right">
                {moment(TransferForm?.TRANSFER_DATE).format("DD / MM / YYYY")}
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
          <div className="flex flex-col mt-2">
            <span className="text-customblack text-[14px]">Status</span>
            <div className="bg-[#28b44c] w-full flex items-center justify-center mt-2 rounded-sm text-white py-1">
              {TransferForm?.TRANSFER_STATUS}
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-customblack text-[14px]">Priority</span>
            <div className="bg-[#ffcc0c] w-full flex items-center justify-center mt-2 rounded-sm text-white py-1 h-7">
              Medium
            </div>
          </div>

          <div className="w-full border border-gray-300 mt-6" />
          <div className="mt-6">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes"
              value={TransferForm?.NOTES}
              onChange={updateNote}
              disabled={
                TransferForm?.TRANSFER_STATUS == "Completed" ? true : false
              }
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

export default TransferForm;
