import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoArrowSwitch } from "react-icons/go";
import {
  setLocations,
  setOrderIds,
  setSplitDrawer,
  setSplitRowQuantity,
  setStockOrder,
  setTransferDrawer,
} from "../../../redux/stockSlice";
import { FaRegSquarePlus } from "react-icons/fa6";
import Tooltip from "../../../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const StockGridSku = ({ data, rowData, index, id, obj }) => {
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const [isDrawer, setIsDrawer] = useState(false);

  const warehouseLocationApi = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetWarehouseLocationList`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

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
      // dispatch(updateSubGridData({SOId: stockOrderFormDataId, locId: }))
    }
  };

  const warehouseLocationPayload = {
    action: "Administration",
    data: {
      ACTIVE_FLAG: "Y",
      SEARCH: "",
      ORDER: "LOCATION ASC",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      OFFSET: "",
      WAR_ID: rowData.WAR_ID,
    },
    method: "GetWarehouseLocationList",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const openModal = () => {
    dispatch(
      setOrderIds({ orderId: id, detailId: rowData.INVSTODET_ID })
    );
    let items = (obj?.product.map((item) => {
      if (item.INVSTODET_ID == rowData.INVSTODET_ID) {
          return {
              ...item,
              QUANTITY: 0
          };
      }
      return item;
  })
  .filter((filteredItem) => filteredItem));

    dispatch(
      setStockOrder({ form: obj?.form, detail: items, split: true })
    );
    dispatch(setSplitRowQuantity(rowData.QUANTITY));
    sendRequest(
      warehouseLocationApi,
      "POST",
      warehouseLocationPayload,
      getLocations,
      token
    );
    dispatch(setSplitDrawer(true));
  };

  const handleOpenDrawer = () => {
    setIsDrawer(false);
  };
  const handleCloseDrawer = () => {
    dispatch(setTransferDrawer(false));
  };

  return (
    <div className="w-full h-full flex justify-center items-center pr-2 ">
      <div className="w-full">
        <span className="text-customblack text-[14px] leading-[21px] font-normal line-clamp-1">
          {data}
        </span>
      </div>
      <div className={`px-4 border-l h-full  items-center flex `}>
        {/* <GoArrowSwitch onClick={openModall} className="w-full text-center text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer " /> */}
        {rowData?.WAR_ID != 3909 &&
        rowData?.WAR_ID != 3024 &&
        rowData.USE_ID_ASSIGNED_TO == null ? (
          <FaRegSquarePlus
            onClick={openModal}
            className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer "
          />
        ) : (
          <Tooltip content="Item not transfer or Assigned">
            <FaRegSquarePlus className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer " />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default StockGridSku;
