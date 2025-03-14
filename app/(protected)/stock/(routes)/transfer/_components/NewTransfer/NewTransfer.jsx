import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { GoEye, GoHome } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import NewTransferHeader from "./NewTransferHeader";
import { useDispatch, useSelector } from "react-redux";
import LotNumber from "../TransferForm/LotNumber";
import {
  setPhysicalCountDetails,
  updateNotes,
  updatePCEmpty,
} from "../../redux/TransferSlice";
import AddTransfer from "./AddTransfer";
import SecLocSelect from "../TransferForm/SecLocSelect";
import RowLocSelect from "../TransferForm/RowLocSelect";
import BinLocSelect from "../TransferForm/BinLocSelect";
import TransferQTY from "../TransferForm/TransferQTY";
import MoreOption from "./MoreOption";
import WarehouseTo from "../TransferForm/WarehouseTo";

const NewTransfer = () => {
  const [data, setData] = useState();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  let TransferForm = useSelector((state) => state.TransferSlice.TransferForm);
  let transferDetails = useSelector(
    (state) => state.TransferSlice.transferDetails
  );
  const updateNote = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    dispatch(updateNotes(newNotes));
  };
  // let SelectedWarid = useSelector((state) => state.TransferSlice.SelectedWarid);

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const initialHead = [
    { title: "SKU", slector: "PART_CODE", Wid: 200 },
    // { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 150 },
    { title: "Lot#", slector: "LOT_NUMBER", Wid: 120 },
    // { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120 },
    { title: "Sec", slector: "SECTION", Wid: 30 },
    { title: "Row", slector: "SHELF", Wid: 30 },
    { title: "Bin", slector: "BIN_NUMBER", Wid: 30 },
    { title: "Warehouse Frm", slector: "INVENTORY_FROM", Wid: 80 },

    { title: "OH QTY", slector: "OH_QTY", Wid: 40 },
    { title: "Avl QTY", slector: "AVL_QTY", Wid: 40 },

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
    { title: "OH QTY", slector: "OH_QTY", Wid: 40 },
    { title: "Avl QTY", slector: "AVL_QTY", Wid: 40 },
    {
      title: "Qty Transfer",
      slector: "QUANTITY",
      customComp: TransferQTY,
      Wid: 40,
    },

    // { title: "Adjustment", slector: "QTY_ONHAND", Wid: 120 },
  ];

  const [head, setHead] = useState(initialHead);
  const [hideOnhandQty, setHideOnhandQty] = useState(false);

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {};
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

  const tabs = [
    {
      label: "Overview",
      icon: <GoHome />,
    },
  ];

  return (
    <div className="flex h-[80vh] overflow-hidden gap-2">
      <div className="lg:w-9/12 flex flex-col bg-white border border-gray-300 rounded">
        <NewTransferHeader />
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
            selectedRow={selectedRow}
            MoreOpt={MoreOption}
            MoreOption={MoreOption}
            isChecked={checked}
            checkBoxShow={false}
            moreOptShow={true}
            addButton={true}
            GriddFooterAdd={AddTransfer}
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
              New
            </div>
          </div>
          {/* <div className="flex flex-col mt-2">
            <span className="text-customblack text-[14px]">Priority</span>
            <div className="bg-[#ffcc0c] w-full flex items-center justify-center mt-2 rounded-sm text-white py-1 h-7"></div>
          </div> */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-start mt-6">
              <div className="flex items-center">
                <input
                  // onClick={toggleOnhandQtyVisibility}
                  id="default-checkbox"
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
              value={TransferForm?.NOTES || notes}
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

export default NewTransfer;
