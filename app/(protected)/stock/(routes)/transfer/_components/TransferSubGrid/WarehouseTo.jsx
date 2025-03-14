import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  UpdateSubWarIdTo,
  UpdateWarIdTo,
  UpdateWarLocIdTo,
  setLocations,
} from "../../redux/TransferSlice";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const WarehouseTo = ({ data, index, rowData }) => {
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const checkUpdatelist = useSelector((state) => state.TransferSlice.wareHouse);
  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const subData = useSelector((state) => state.TransferSlice.subData[0]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  // 2190
  const handleOnFocus = () => {};
  const handleOnBlur = () => {};
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
        if (a === "OS") return 1;
        if (b === "OS") return -1;

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
  const handleSelectedOptionChange = (option) => {
    const warehouseLocationPayload = {
      action: "Administration",
      data: {
        ACTIVE_FLAG: "Y",
        SEARCH: "",
        ORDER: "LOCATION ASC",
        RNUM_FROM: "1",
        RNUM_TO: "100000",
        OFFSET: "",
        WAR_ID: option.WAR_ID,
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
      token
    );

    const data = {
      ind: index,
      PId: rowData.INVTRA_ID,
      warehouse: option.WAREHOUSE,
      warId: option.WAR_ID,
    };
    dispatch(UpdateSubWarIdTo(data));
  };
  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[2px] justify-center">
      <div>
        <Dropdown
          options={checkUpdatelist}
          optionKey1="WAREHOUSE"
          optionKey2="WAR_ID"
          onSelectedOptionChanged={handleSelectedOptionChange}
          placeholder="+ Add Warehouse"
          inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName=" bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          // customFocusKey1="shiftKey"
          // customFocusKey2="Z"
          customFocusKey="w"
          isDisabled={subData?.form[0]?.TRANSFER_STATUS == "NEW" ? false : true}
          onClearInputValue={false}
          onHandleFocus={handleOnFocus}
          onDefaultInput={data}
          // showValue=""
          onHandleBlur={handleOnBlur}
          isCreateOption={false}
        />
      </div>
    </div>
  );
};

export default WarehouseTo;
