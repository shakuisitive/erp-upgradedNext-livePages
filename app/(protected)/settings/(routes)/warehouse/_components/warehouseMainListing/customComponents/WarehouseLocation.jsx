import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useDispatch, useSelector } from "react-redux";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { GrHomeRounded } from "react-icons/gr";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import InputModal from "../../../../../../../../components/misc/pureComponents/modal/InputModal";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import UpdateWarehouseLoc from "./UpdateWarehouseLoc";
import WarehouseLocMin from "./WarehouseLocMin";
import WarehouseLocMax from "./WarehouseLocMax";
import WarehouseLocReorder from "./WarehouseLocReorder";
import { closeModal } from "../../../_redux/warehouseSlice";
const WarehouseLocation = () => {
  const [row, setRow] = useState([]);
  const [hitFcApi, setHitFcApi] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessAdmin, setAccessAdmin] = useState("");

  const [isError, setIsError] = useState("");
  const [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const locationList = useSelector(
    (state) => state.warehouseSlice.locationList
  );
  const fcLocList = useSelector((state) => state.warehouseSlice.fcLocList);
  const fcLocListPar = useSelector(
    (state) => state.warehouseSlice.fcLocListPar
  );
  const formIndex = useSelector((state) => state.warehouseSlice.formIndex);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Location",
      slector: "LOCATION",

      Wid: 150,
    },
    {
      title: "OH QTY",
      slector: "LOC_ONHAND_QTY",

      Wid: 120,
    },
  ]);
  const [FcHead, setFCHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Location",
      slector: "LOCATION",

      Wid: 150,
    },
    {
      title: "SKU",
      slector: "SKU",

      Wid: 120,
    },
    {
      title: "Lot",
      slector: "LOT",
      Wid: 120,
    },
    {
      title: "OH",
      slector: "loc_avl_qty",
      Wid: 120,
    },
    {
      title: "Min",
      slector: "MIN_QTY",
      customComp: WarehouseLocMin,
      Wid: 120,
    },
    {
      title: "Max",
      slector: "MAX_QTY",
      customComp: WarehouseLocMax,

      Wid: 120,
    },
    {
      title: "Reorder",
      slector: "REORDER_QUANTITY",
      customComp: WarehouseLocReorder,

      Wid: 120,
    },
  ]);

  const colapsfunc = () => {
    setColaps(!colaps);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && !checkedAll) {
      setCheckedAll(true);
      const data = row.Result.map((SData, i) => {
        return { rowI: i, rowData: SData };
      });
      setCheckedItems(data);
    } else if (rowData == "all" && checkedAll) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI || item.rowData !== rowData
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  const tabs = [
    {
      label: "Updates",
      icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
      content: <UpdateWarehouseLoc />,
    },
  ];
  const handleCloseDrawer = () => {
    setIsDrawer(false);
  };
  const overridePayload = {
    data: {
      ADMIN_PASSWORD: accessAdmin,
    },
    action: "Administration",
    method: "GetAdminAccess",
    username: "admin",
  };
  const handleVerifyCodeResData = (data) => {
    // console.log("checking access admin flag", data?.Result);
    if (data?.CODE === "SUCCESS") {
      setIsDrawer(true);
      //   dispatch(setAccessFlag(data?.Result[0]));
    }
  };
  const handleAccessAdmin = () => {
    if (accessAdmin == "12123") {
      sendRequest(
        Administration.GetAdminAccess,
        "POST",
        overridePayload,
        handleVerifyCodeResData,
        token
      );
      setIsModalOpen(false);
      setAccessAdmin("");
      //   handleViewPartPrice();
    }
  };
  let locationsData = fcLocListPar.map((item) => {
    return {
      WARSTOLOC_ID: item?.WARSTOLOC_ID,
      WAR_ID: item?.WAR_ID,
      SEQ_NUMBER: item?.RNUM,
      MAX_QTY: item?.MAX_QTY,
      MIN_QTY: item?.MIN_QTY,
      RACK: item?.SECTION,
      SHELF: item?.ROW,
      BIN: item?.BIN,
      BARCODE_NUMBER: item?.LOCATION_BARCODE,
      AUTO_REORDER_FLAG: "N",
      REORDER_QUANTITY: item?.REORDER_QUANTITY,
      ACTIVE_FLAG: item?.ACTIVE_FLAG || "Y",
      ZONE: item?.ZONE,
      AISLE: item?.AISLE,
      PAR_ID: item?.PAR_ID,
      INVPARLOT_ID: item?.INVPARLOT_ID,
    };
  });
  const payloadFc = {
    data: locationsData,
    action: "InventoryWeb",
    method: "PostWarehouseStockLocation",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostFc = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  // useEffect(() => {
  //   if (hitFcApi) {

  //   }
  // }, [fcLocListPar, hitFcApi]);
  const handleApply = () => {
    setHitFcApi(true);
    if (hitFcApi) {
      sendRequest(
        Administration.PostWarehouseStockLocation,
        "POST",
        payloadFc,
        handlePostFc,
        token
      );
    }
  };
  return (
    <div className="flex-col bg-white">
      {/* <DropdownMenu
        label="Update"
        handleClick={() => {
          setIsModalOpen(true);
        }}
      /> */}
      <DropdownMenu label="Update" handleClick={handleApply} />
      <div className="flex flex-col gap-4 w-full h-full justify-between bg-white mb-2 rounded-t-md">
        <div>
          <GridTable
            head={formIndex?.WAR_ID == 2192 ? FcHead : head}
            row={formIndex?.WAR_ID == 2192 ? fcLocList : locationList}
            setHead={setHead}
            title="Location"
            GridColor="#4ade80"
            GridColaps={true}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfunc}
            addButton={false}
            isChecked={checked}
            checkBoxShow={false}
            moreOptShow={false}
            //   GriddFooterAdd={CustPartPriceGridPagination}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <InputModal
          onClose={() => setIsModalOpen(false)}
          code={accessAdmin}
          setCode={setAccessAdmin}
          isError={isError}
          action={handleAccessAdmin}
        />
      )}
      <RightDrawer
        isOpen={isDrawer}
        onClose={handleCloseDrawer}
        heading="Warehouse Location"
        tabs={tabs}
      />
    </div>
  );
};

export default WarehouseLocation;
