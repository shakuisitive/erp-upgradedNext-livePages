import React, { useState } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import MoreOption from "./../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import { GoEye, GoHome } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { PhysicalCount } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import NewPCHeader from './NewPCHeader';
import { useDispatch, useSelector } from "react-redux";
import LotNumber from "../PhysicalCountForm/LotNumber";
import { setPhysicalCountDetails } from "../../redux/physicalCountSlice";

const NewPhysicalCount = ({nonSPC}) => {
  const [data, setData] = useState();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  let physicalCountDetails = useSelector(
    (state) => state.physicalCount.physicalCountDetails
  );

  let SelectedWarid = useSelector(
    (state) => state.physicalCount.SelectedWarid
  );

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;


  const [head, sethead] = useState([
    { title: "", slector: "", Wid: 0 },
    { title: "Item", slector: "PART_CODE", Wid: 250 },
    { title: "Product", slector: "SKU_MANUFACTURE", Wid: 20 },
    { title: "OH QTY", slector: "OH_QTY", Wid: 120 },
    { title: "LOT", slector: "LOT_NUMBER", customComp: LotNumber, Wid: 120 },
    // { title: "Count", slector: "DESCRIPTION", Wid: 120 },
    // { title: "Adjustment", slector: "QTY_ONHAND", Wid: 120 },
  ]);
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
  ];

  const listPayload = {
    data: {
      WAR_ID: SelectedWarid.WAR_ID,
      NON_STOCK_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetAutoPCDetailList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const getList = (data) => {
    if(nonSPC == true) {
      const filter =  data.Result.filter((item) => item.NON_STOCK_ITEM_FLAG == "Y")
      dispatch(setPhysicalCountDetails(filter));
    } else {
      dispatch(setPhysicalCountDetails(data.Result));
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

  return (
    <div className="flex h-[80vh] overflow-hidden gap-2">
      <div className="lg:w-9/12 flex flex-col bg-white border border-gray-300 rounded">
        <NewPCHeader />
        <div className=" bg-white pr-2 overflow-scroll">
          <GridTable
            head={head}
            setHead={sethead}
            row={physicalCountDetails}
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
          
            <div
              onClick={generateList}
              className="bg-[#2596be] w-full flex items-center justify-center mt-2 rounded-sm text-gray-300 py-1"
            >
              Generate Physical Count
            </div>
         
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
                  checked
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
          {/* <div className="mt-6">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes"
              value={physicalCountForm?.NOTES}
              onChange={updateNote}
            />
          </div> */}
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

export default NewPhysicalCount;
