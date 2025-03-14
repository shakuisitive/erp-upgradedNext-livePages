import React, { useEffect, useState } from "react";
import PMAttributeLeft from "./Header/PMAttributeLeft";
import PMAttributeRight from "./Header/PMAttributeRight";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PMAdditionalTabs from "./PMAdditionalTabs";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { closeModal, setRefresh } from "../../../redux/pmSlice";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";

const PMWebAttributes = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [isHeader1, setIsHeader1] = useState(true);
  const [rightActive, setRightActive] = useState(true);
  const [descTitle, setDescTitle] = useState("");
  const [description, setDescription] = useState("");

  const [contentId, setContentId] = useState("");
  const [assignCat, setAssignCat] = useState("");
  const [brandId, setBrandId] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const [tabs, setTabs] = useState([
    { id: "", inputValue: "", description: "", active: true },
    { id: "", inputValue: "", description: "", active: true },
  ]);

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);

  const handleAddTab = () => {
    setTabs([...tabs, { inputValue: "", description: null, active: true }]);
  };
  const handleInputChange = (index, value) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].inputValue = value;
    setTabs(updatedTabs);
  };
  const handleActiveChange = (index, active) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].active = active;
    setTabs(updatedTabs);
  };
  const handleDescriptionChange = (index, description) => {
    const updatedTabs = [...tabs];
    updatedTabs[index].description = description;
    setTabs(updatedTabs);
  };
  const payload = {
    PAR_ID: editDetForm?.PAR_ID,
    CODE: editDetForm?.PAR_CODE,
    NAME: editDetForm?.NAME,
    SKU_MANUFACTURE: editDetForm?.SKU_MANUFACTURE,
    BARCODE_NUMBER: editDetForm?.BARCODE_NUMBER,
    DESCRIPTION: editDetForm?.PART_DESCRIPTION,
    UOM_ID: editDetForm?.UOM_ID,
    PARGRO_ID: editDetForm?.PARGRO_ID,
    MARGRO_ID: "",
    MARKUP_BASED_ON: "STD",
    PRICE: editDetForm?.PRICE,
    STANDARD_COST: editDetForm?.STANDARD_COST,
    LAST_PURCHASE_COST: "",
    ENABLE_ITEM_LEVEL_CHARGE: "N",
    ITEM_LEVEL_CHARGE: "",
    NOTES: editDetForm?.NOTES,
    FUEL_FLAG: "N",
    STOCK_ITEM_FLAG: editDetForm?.STOCK_ITEM_FLAG,
    GLACC_ID_ASSET: "",
    GLACC_ID_REVENUE: "",
    GLACC_ID_COGS: "",
    ACTIVE_FLAG: editDetForm?.ACTIVE_FLAG,
    USE_ID: "2694",
    VMRSYS_ID: "",
    VMRASS_ID: "",
    VMRCOM_ID: "",
    CONVERSION_TO_STOCKING_UOM: editDetForm?.CONVERSION_INTO_STOCKING_UOM,
    WARRANTY: "",
    PAR_ID_SUPERCEDES: "",
    UOM_ID_REORDERING: editDetForm?.UOM_ID,
    ALLOW_NEGATIVE_FLAG: "N",
    ITEM_LEVEL_CHRG_EXP_DATE: "",
    REFERENCE_NUMBER: "",
    SHOSUP_FLAG: editDetForm?.SHOPSUPPLY_FLAG,
    ALLOW_FRACTION_QTY: "N",
    ALLOW_NEG_RO_COMP_FLAG: "N",
    DimensionL: editDetForm?.DimensionL,
    DimensionH: editDetForm?.DimensionH,
    DimensionW: editDetForm?.DimensionW,
    Weight: editDetForm?.Weight,
    ALLOW_TAX_FLAG: "Y",
    PARWAR_ID: editDetForm?.PAR_WAR_ID,
    UOW_ID: editDetForm?.UOW_ID,
    UPC_MANUFACTURE: editDetForm?.UPC_MANUFACTURE,
    AVAILABLE_TO_ALL_CHANNELS: "N",
    PRICE_MANUAL_INSERT: "N",
    PARCATGR_ID: "",
    SHIPPING_WEIGHT_UNIT: editDetForm?.SHIPPING_WEIGHT_UNIT,
    SHIPPING_WEIGHT: editDetForm?.SHIPPING_WEIGHT,
    BOLTON_FLAG: "N",
    NON_STOCK_ITEM_FLAG: "N",
    VEN_ID: "",
    // FileNames: editDetForm?.FileNames || [],
    BUYERPARTNUMBER: "",
    COU_ID_ORIGIN: "",
    ELETCRONIC_SERIAL_NUMBER: editDetForm?.ELETCRONIC_SERIAL_NUMBER,
    WEB_SALE_ITEM_FLAG: "N",
    FINAL_SALE_ITME_FLAG: "N",
    CLEARANCE_ITEM_FLAG: editDetForm?.CLEARANCE_ITEM_FLAG,
    RESTRICTED_ITEM_FLAG: editDetForm?.RESTRICTED_ITEM_FLAG,
    CASE_DIMENSION_L: editDetForm?.CASE_DIMENSION_L,
    CASE_DIMENSION_H: editDetForm?.CASE_DIMENSION_H,
    CASE_DIMENSION_W: editDetForm?.CASE_DIMENSION_W,
    CASE_WEIGHT: editDetForm?.CASE_WEIGHT,
    CASE_UOW_ID: editDetForm?.CASE_UOW_ID,
    CASE_SHIPP_WEIGHT: editDetForm?.CASE_SHIPP_WEIGHT,
    CASE_SHIPP_UOW_ID: editDetForm?.CASE_SHIPP_UOW_ID,
    SHOW_NEW_START_DATE: "",
    SHOW_NEW_END_DATE: "",
    PROFIT_MARGIN_PERCENTAGE: "",
    PARBRA_ID: brandId,
    PARASSIGNCAT_ID: assignCat,
  };

  const payloadPostPartDet = {
    data: payload,
    action: "ItemMaster",
    method: "PostPartDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const createPayload = () => {
    const firstElement = {
      ACTIVE_FLAG: rightActive ? "Y" : "N",
      DETAILED_DESCRIPTION: description,
      NAME: descTitle,
      PARCONTENT_ID: contentId || "",
      PAR_ID: editDetForm?.PAR_ID,
      USE_ID: "2694",
    };

    const tabsData = tabs.map((tab) => ({
      ACTIVE_FLAG: tab.active ? "Y" : "N",
      DETAILED_DESCRIPTION: tab.description,
      NAME: tab.inputValue,
      PARCONTENT_ID: tab?.id || "",
      PAR_ID: editDetForm?.PAR_ID,
      USE_ID: "2694",
    }));

    let postContentPayload = {
      data: [firstElement, ...tabsData],
      action: "Administration",
      method: "PostPartContents",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    return postContentPayload;
  };
  const finalPayload = createPayload();
  let getContentPayload = {
    data: {
      PAR_ID: editDetForm?.PAR_ID,
      ACTIVE_FLAG: "Y",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetPartContents",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetPartCostData = (data) => {
    // console.log("data: ", data);
    if (data.CODE === "SUCCESS") {
      const result = data?.Result;
      const firstItem = result[0];
      const ACTIVE =
        firstItem?.ACTIVE_FLAG === "Y"
          ? true
          : firstItem?.ACTIVE_FLAG === "N"
          ? false
          : true;

      setContentId(firstItem?.PARCONTENT_ID);
      setDescription(firstItem?.DETAILED_DESCRIPTION);
      setDescTitle(firstItem?.NAME);
      setRightActive(ACTIVE);

      const remainingTabs = result.slice(1).map((item) => ({
        id: item.PARCONTENT_ID,
        inputValue: item?.NAME,
        description: item?.DETAILED_DESCRIPTION,
        active: item?.ACTIVE_FLAG === "Y",
      }));

      setTabs(remainingTabs);
    }
  };
  // console.log("tabs: ", tabs);
  // console.log("description: ", description);
  useEffect(() => {
    if (editDetForm?.PAR_ID) {
      sendRequest(
        Administration.GetPartContents,
        "POST",
        getContentPayload,
        handleGetPartCostData,
        token
      );
    }
    if (editDetForm) {
      setBrandId(editDetForm?.PARBRA_ID);
      if (editDetForm?.ASSIGNED_CATEGORIES_ID) {
        setAssignCat(editDetForm?.ASSIGNED_CATEGORIES_ID);
      }
    }
  }, [editDetForm]);
  const handlePostPartContent = (data) => {
    dispatch(closeModal());
    dispatch(setRefresh());
  };
  const handlePostPartDet = (data) => {
    // console.log("payload: ", finalPayload);

    sendRequest(
      Administration.PostPartContents,
      "POST",
      finalPayload,
      handlePostPartContent,
      token
    );
  };
  const handleApply = () => {
    sendRequest(
      ItemMaster.PostPartDetails,
      "POST",
      payloadPostPartDet,
      handlePostPartDet,
      token
    );
  };
  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["x"], onKeyPress);

  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white"
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div className="ml-[58px] my-4">
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
              <div className="flex px-4 mr-2 gap-4 desktop:flex-row tablet:flex-col">
                <div className="w-1/2 tablet:w-full">
                  <PMAttributeLeft
                    brandId={brandId}
                    setBrandId={setBrandId}
                    assignCat={assignCat}
                    setAssignCat={setAssignCat}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                  />
                </div>
                <div className="w-1/2 tablet:w-full">
                  <PMAttributeRight
                    rightActive={rightActive}
                    setRightActive={setRightActive}
                    descTitle={descTitle}
                    setDescTitle={setDescTitle}
                    description={description}
                    setDescription={setDescription}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="ml-[58px] my-4">
            <button
              className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
              onClick={() => setIsHeader1(!isHeader1)}
            >
              {isHeader ? (
                <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
              ) : (
                <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
              )}
              Additional Tabs
            </button>
          </div>
          {isHeader1 && (
            <div className="ml-10">
              <div className="grid grid-cols-2 gap-4 px-4 mr-2">
                {tabs.map((tab, index) => (
                  <div key={index} className="w-full">
                    <PMAdditionalTabs
                      index={index}
                      initialInputValue={tab.inputValue}
                      initialDescription={tab.description}
                      initialActive={tab.active}
                      onInputChange={(value) => handleInputChange(index, value)}
                      onActiveChange={(active) =>
                        handleActiveChange(index, active)
                      }
                      onDescriptionChange={(description) =>
                        handleDescriptionChange(index, description)
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddTab}
                className="hover:text-blue-400 text-[16px] text-customblack mt-4 ml-10 "
              >
                + Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMWebAttributes;
