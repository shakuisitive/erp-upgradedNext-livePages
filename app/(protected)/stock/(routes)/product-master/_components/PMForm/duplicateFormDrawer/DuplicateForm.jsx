import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosRemoveCircleOutline } from "react-icons/io";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useSelector, useDispatch } from "react-redux";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import SectionTo from "../duplicateFormDrawer/duplicateGridComp/SectionTo";
import BinTo from "../duplicateFormDrawer/duplicateGridComp/BinTo";
import RowTo from "../duplicateFormDrawer/duplicateGridComp/RowTo";
import TrfQuantity from "../duplicateFormDrawer/duplicateGridComp/TrfQuantity";
import {
  removeSameIndex,
  setBinTo,
  setDuplicateDrawer,
  setIsCheckedFItem,
  setLocationOptions,
  setRowTo,
  setSectionTo,
} from "../../../redux/pmSlice";

const DuplicateForm = ({ setEMessage, setIsErrorMessage, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colaps, setColaps] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [currWarId, setCurrWarId] = useState("");
  const [sectionOption, setSectionOption] = useState([]);
  const [rowOption, setRowOption] = useState([]);
  const [binOption, setBinOption] = useState([]);
  let [error, sendRequest] = useApiFetch();
  const tooltipRef = useRef(null);
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const duplicateLotData = useSelector(
    (state) => state.pmSlices.duplicateLotData
  );
  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);

  const [duplicatePrice, setDuplicatePrice] = useState(editDetForm?.PRICE);

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    { title: "Lot#", slector: "LOT_NUMBER", Wid: 100 },
    { title: "Sec From", slector: "RACK", Wid: 90 },
    { title: "Row From", slector: "SHELF", Wid: 90 },
    {
      title: "Bin From",
      slector: "BIN_NUMBER",
      Wid: 90,
    },

    {
      title: "Sec To",
      slector: "SECTION_TO",
      Wid: 90,
      customComp: SectionTo,
    },
    {
      title: "Row To",
      slector: "ROW_TO",
      Wid: 90,
      customComp: RowTo,
    },
    {
      title: "Bin To",
      slector: "BIN_TO",
      Wid: 90,
      customComp: BinTo,
    },
    {
      title: "OH Qty",
      slector: "OH_QUANTITY",
      Wid: 90,
    },
    {
      title: "Avl Qty Lot",
      slector: "lot_avl_qty",
      Wid: 90,
    },
    {
      title: "Tfr Qty",
      slector: "TFR_QUANTITY",
      Wid: 90,
      customComp: TrfQuantity,
    },
  ]);

  const [warehouseData, setWarehouseData] = useState([]);

  const handleGetWareHouseLocationList = (data) => {
    if (data?.CODE == "SUCCESS") {
      let secOptions = [];
      let rowOptions = [];
      let binOptions = [];

      let locList = data?.Result?.Results.map((item) => {
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
        return { ...item };
      });

      const customSort = (a, b) => {
        if (a === "OS") return 1;
        if (b === "OS") return -1;
        return a - b;
      };

      secOptions = secOptions.sort(customSort);
      rowOptions = rowOptions.sort(customSort);
      binOptions = binOptions.sort(customSort);

      setSectionOption(secOptions);
      dispatch(setRowTo(rowOptions));
      dispatch(setSectionTo(secOptions));
      dispatch(setBinTo(binOptions));
      dispatch(setLocationOptions(locList));
    }
  };

  useEffect(() => {
    const uniqueWarehouses = duplicateLotData?.reduce((acc, item) => {
      if (!acc.some((w) => w.WAR_ID === item.WAR_ID)) {
        acc.push(item);
      }
      return acc;
    }, []);
    setWarehouseData(uniqueWarehouses);
    if (uniqueWarehouses?.length > 0) {
      const firstWarId = uniqueWarehouses[activeTab]?.WAR_ID;
      const initialFilteredData = duplicateLotData?.filter(
        (item) => item.WAR_ID === firstWarId
      );
      setFilteredData(initialFilteredData);
      setCurrWarId(firstWarId);
      const locationListPayload = {
        data: {
          ACTIVE_FLAG: "Y",
          SEARCH: "",
          ORDER: "LOCATION ASC",
          RNUM_FROM: "1",
          RNUM_TO: "100000",
          OFFSET: "",
          WAR_ID: firstWarId,
        },
        action: "Administration",
        method: "GetWarehouseLocationList",
        username: "admin",
        type: "rpc",
        tid: "144",
      };
      sendRequest(
        Administration.GetWareHouseLocations,
        "POST",
        locationListPayload,
        handleGetWareHouseLocationList,
        token
      );
    }
  }, [duplicateLotData, activeTab]);

  const handleCheckboxChange = (rowI, rowDataa) => {
    if (rowDataa == "all" && checkedAll == false) {
      setCheckedAll(true);

      const arr = filteredData?.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        return obj;
      });

      setCheckedItems(arr);
      // dispatch(setIsCheckedFItem(arr))
    } else if (rowDataa == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowDataa)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowDataa
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData: rowDataa }]);
      }
    }
  };

  useEffect(() => {
    dispatch(setIsCheckedFItem(checkedItems));
  }, [checkedItems]);

  const colapsfunc = () => {
    if (colaps) {
      setColaps(false);
      //   setColapsComp(true);
    } else {
      setColaps(!colaps);
    }
  };

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    if (checkedItems.length > 0) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }, []);

  const onCloseMode = () => {};

  const handleTabClick = (index, warId) => {
    setActiveTab(index);
  };

  const postDuplicatePayload = {
    data: {
      data: {
        PAR_ID: editDetForm?.PAR_ID,
        PRICE: duplicatePrice,
        USE_ID: "2694",
        PAR_ID_CHILD: editDetForm?.CHILD_PAR_ID
          ? editDetForm?.CHILD_PAR_ID
          : "",
      },
      action: "Inventory",
      method: "PostDuplicatePart",
      tid: "144",
      type: "rpc",
      username: "admin",
    },
  };
  const [modifiedPayload, setModifiedPayload] = useState([]);

  useEffect(() => {
    const items = checkedItems.map(({ rowData }) => ({
      PAR_ID: rowData?.PAR_ID,
      WAR_ID: rowData?.WAR_ID,
      QUANTITY: rowData?.AVL_QUQNTITY,
      INVPARLOT_ID: rowData?.INVPARLOT_ID,
      WARSTOLOC_ID_FROM: rowData?.WARSTOLOC_ID,
      WARSTOLOC_ID_TO: rowData?.WARSTOLOC_ID,
    }));

    setModifiedPayload(items);
  }, [checkedItems]);

  const payloadLot = {
    data: modifiedPayload,
    method: "PostDuplicatePartLot",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const handleDuplicatePartLOT = (data) => {};

  const handleDuplicatePartData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        ItemMaster.PostDuplicatePartLot,
        "POST",
        payloadLot,
        handleDuplicatePartLOT,
        token
      );
      onClose();
      dispatch(setDuplicateDrawer(false));
    }
  };
  // console.log("checkedItems?.length: ", checkedItems?.length);
  const handleCreateDuplicatePart = () => {
    if (checkedItems?.length > 0) {
      const hasQuantityGreaterThanOne = modifiedPayload.some(
        (item) => item.QUANTITY > 0
      );

      if (hasQuantityGreaterThanOne) {
        sendRequest(
          ItemMaster.PostDuplicatePart,
          "POST",
          postDuplicatePayload,
          handleDuplicatePartData,
          token
        );
      } else {
        setEMessage("Please select an item with quantity greater than 1.");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Please select at least one lot");
      setIsErrorMessage(true);
    }
  };
  // console.log("Par code: ", editDetForm?.PAR_CODE);

  const handleNewPriceChange = (e) => {
    const value = Number(e.target.value);
    setDuplicatePrice(value);
  };

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className=" relative items-center mb-4">
        <div className="mr-3  flex pl-3 w-[120px] cursor-pointer justify-between rounded-md bg-[#0073EA] ">
          <div
            className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle  "
            onClick={handleCreateDuplicatePart}
          >
            <button type="submit">Create</button>
          </div>
          <div
            className="text-white flex items-center px-2 cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoIosArrowDown className="text-[18px] " />
          </div>
        </div>
        {isOpen && (
          <div
            ref={tooltipRef}
            className="absolute mt-2 w-[170px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
          >
            <div className="flex flex-col items-center">
              <div className="cursor-pointer flex items-center my-2 gap-4  py-1 pl-2 w-full text-customblack hover:bg-customLightGray">
                <IoIosRemoveCircleOutline />
                <span>Cancle</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full flex items-start gap-[10px] ">
            <span className="text-[18px] w-full max-w-[130px]">
              Current SKU
            </span>
            <input
              type="email"
              name="EmailAddresses"
              disabled={true}
              value={editDetForm?.PAR_CODE}
              placeholder="Please Enter Part"
              className="w-full bg-white border  py-2 border-gray-300  text-[14px] outline-none px-2 mr-2"
            />
          </div>
          <div className="w-full flex items-start gap-[10px] ">
            <p className="text-[18px] w-full max-w-[100px]">New SKU</p>
            <input
              type="text"
              name="PAR_CODE"
              disabled={true}
              value={`${editDetForm?.PAR_CODE}-S`}
              placeholder="Please Enter new Part"
              className="w-full bg-white border  py-2 border-gray-300  text-[14px] outline-none px-2 mr-2"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-full flex items-start gap-[10px] ">
            <span className="text-[18px] w-full max-w-[130px]">
              Current Price
            </span>
            <input
              type="number"
              name="currentPrice"
              disabled={true}
              value={editDetForm?.PRICE?.toFixed(2)}
              placeholder="12.99"
              className="w-full bg-white border  py-2 border-gray-300  text-[14px] outline-none px-2 mr-2"
            />
          </div>
          <div className="w-full flex items-start gap-[10px] ">
            <p className="text-[18px] w-full max-w-[100px]">New Price</p>
            <input
              type="number"
              name="newPrice"
              onChange={handleNewPriceChange}
              value={duplicatePrice}
              placeholder="12.99"
              className="w-full bg-white border  py-2 border-gray-300  text-[14px] outline-none px-2 mr-2"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-1 font-normal mt-4">
        {warehouseData?.map((tab, index) => (
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
                    ? "text-[16px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                    : "text-[16px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                }`}
                onClick={() => handleTabClick(index, tab?.WAR_ID)}
              >
                {`${tab.WAREHOUSE} - ${tab.WAREHOUSE_DESC}`}
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>

      <GridTable
        head={head}
        row={filteredData}
        setHead={setHead}
        // MoreOpt={SplitMoreOption}
        onCloseMode={onCloseMode}
        GridColor="#4ade80"
        GridColaps={false}
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfunc}
        addButton={false}
        moreOptShow={false}
        selectedRow={selectedRow}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default DuplicateForm;
