import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  RightFormData,
  setDetailFormData,
  newFormData,
  setField,
} from "../../../../redux/pmSlice";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";

const PMDetailRight = ({
  dimensionH,
  setDimensionH,
  dimensionL,
  setDimensionL,
  dimensionW,
  setDimensionW,
  uow,
  setUoW,
  uom,
  setUoM,
  active,
  setActive,
  restricted,
  setRestricted,
  clearance,
  setClearance,
  setUoWBW,
  setUoWSW,
  uowBW,
  uowSW,
  manageStockFlag,
  setManageStockFlag,
  setAllowBackOFlag,
  allowBackOFlag,
  setShopSupplyFlag,
  shopSupplyFlag,
  setConUom,
  conUom,
  oHQty,
  setOhQty,
  weight,
  setWeight,
  group,
  setGroup,
  productType,
  setProductType,
  productClass,
  setProductClass,
  subGroup,
  setSubGroup,
  caseSWeight,
  setCaseSWeight,
  caseSWeightId,
  setCaseSWeightId,
  shippingW,
  setShippingW,
  boxWeight,
  setBoxWeight,
  caseDimH,
  setCaseDimH,
  caseDimW,
  setCaseDimW,
  caseDimL,
  setCaseDimL,
}) => {
  const getUoW = useSelector((state) => state.commonSlices.getUoW);
  const getUoM = useSelector((state) => state.commonSlices.getUoM);
  const groupList = useSelector((state) => state.commonSlices.groupList);
  const subGroupList = useSelector((state) => state.commonSlices.subGroupList);
  const ProductTypeList = useSelector(
    (state) => state.commonSlices.ProductTypeList
  );
  const productClassList = useSelector(
    (state) => state.commonSlices.productClassList
  );
  const detailFormData = useSelector((state) => state.pmSlices.FormData);
  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const [value, setValue] = useState("");
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const pTypeUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetProductTypeList`;

  const handleActiveToggle = () => {
    setActive(!active);
  };
  const handleRestrictedToggle = () => {
    setRestricted(!restricted);
  };
  const handleClearanceToggle = () => {
    setClearance(!clearance);
  };
  const handleShopSupplyFlag = () => {
    setShopSupplyFlag(!shopSupplyFlag);
  };
  const handleAllowBackOFlag = () => {
    setAllowBackOFlag(!allowBackOFlag);
  };

  const handleManageStockFlag = () => {
    setManageStockFlag(!manageStockFlag);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleDimensionL = (e) => {
    setDimensionL(e.target.value);
  };
  const handleDimensionLBlur = () => {
    if (dimensionL) {
      const parsedDimL = parseFloat(dimensionL).toFixed(2);
      setDimensionL(parsedDimL);
    }
  };
  const handleDimensionH = (e) => {
    // const dimH = parseFloat(e.target.value).toFixed(2);
    setDimensionH(e.target.value);
  };
  const handleDimensionHBlur = () => {
    if (dimensionH) {
      const parsedDimH = parseFloat(dimensionH).toFixed(2);
      setDimensionH(parsedDimH);
    }
  };
  const handleDimensionW = (e) => {
    // const dimW = parseFloat(e.target.value).toFixed(2);
    setDimensionW(e.target.value);
  };
  const handleDimensionWBlur = () => {
    if (dimensionW) {
      const parsedDimW = parseFloat(dimensionW).toFixed(2);
      setDimensionW(parsedDimW);
    }
  };

  const handleSelectUoW = (e) => {
    setUoW(e.target.value);
  };

  const handleSelectSWUoW = (e) => {
    setUoWSW(e.target.value);
  };
  const handleSelectCaseSWeightId = (e) => {
    setCaseSWeightId(e.target.value);
  };
  const handleSelectCaseSWeight = (e) => {
    const value = Number(e.target.value);
    setCaseSWeight(value);
  };

  const handleSelectBWUoW = (e) => {
    setUoWBW(e.target.value);
  };

  const handleSelectUoM = (e) => {
    setUoM(e.target.value);
  };

  const handleConUoM = (e) => {
    setConUom(e.target.value);
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };

  const handleSelectGroupList = (e) => {
    setGroup(e.target.value);
  };
  const handleSelectProductType = (e) => {
    setProductType(e.target.value);
  };

  const handleSelectProductClass = (e) => {
    setProductClass(e.target.value);
  };

  const handleSelectSubGroup = (e) => {
    setSubGroup(e.target.value);
  };

  //Arrays
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const geyUowSW = [{ label: "Kg" }, { label: "lb" }];

  return (
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-10 tablet:w-full">
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Active
            </label>
            <ToggleSwitch
              id="active"
              name="ACTIVE_FLAG"
              checked={active}
              onChange={handleActiveToggle}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Manage Stock
            </label>
            <ToggleSwitch
              id="manage-stock"
              name="STOCK_ITEM_FLAG"
              checked={manageStockFlag}
              onChange={handleManageStockFlag}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Shop Supply
            </label>
            <ToggleSwitch
              id="shop-supply"
              name="SHOSUP_FLAG"
              checked={shopSupplyFlag}
              onChange={handleShopSupplyFlag}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Allow Back Order
            </label>
            <ToggleSwitch id="order" />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Clearance
            </label>
            <ToggleSwitch
              id="clearance"
              name="CLEARANCE_ITEM_FLAG"
              checked={clearance}
              onChange={handleClearanceToggle}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Restricted
            </label>
            <ToggleSwitch
              id="restricted"
              name="RESTRICTED_ITEM_FLAG"
              checked={restricted}
              onChange={handleRestrictedToggle}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-4 mb-[12px] mt-[80px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Type
          </label>
          <UseSelect
            options={ProductTypeList}
            optionKeyId="PROD_TYPE_ID"
            optionKeyValue="CODE"
            value={productType}
            placeholder={"Select Type"}
            onChange={handleSelectProductType}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Class
          </label>
          <UseSelect
            options={productClassList}
            optionKeyId="PROD_CLASS_ID"
            optionKeyValue="CODE"
            value={productClass}
            placeholder={"Select Class"}
            onChange={handleSelectProductClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-[16px] mb-[12px] ">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Group
          </label>
          <UseSelect
            options={groupList}
            optionKeyId="PARGRO_ID"
            optionKeyValue="NAME"
            placeholder={"Select Group"}
            value={group}
            onChange={handleSelectGroupList}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="py-2 font-[500] text-[14px]" htmlFor="code">
            SubGroup
          </label>
          <UseSelect
            options={subGroupList}
            optionKeyId="PARSUBGRO_ID"
            optionKeyValue="PRODUCT_SUB_GROUP_NAME"
            placeholder={"Select Sub Group"}
            value={subGroup}
            onChange={handleSelectSubGroup}
          />
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            UoM
          </label>
          <UseSelect
            options={getUoM}
            optionKeyId="UOM_ID"
            optionKeyValue="CODE"
            value={uom}
            onChange={handleSelectUoM}
            placeholder="UOM"
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Conv. UoM
          </label>
          <UseInput
            type="number"
            placeholder="Conv UoM"
            fieldname="DimensionL"
            value={editDetForm?.CONVERSION_INTO_STOCKING_UOM || conUom}
            onChange={handleConUoM}
            // onBlur={handleDimensionLBlur}
          />
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Conv. Qty
          </label>
          <UseInput
            type="number"
            placeholder="Conv. Qty"
            id=""
            // value={editDetForm?.QTY_AVAILABLE}
            // onChange={handleDimensionH}
            // onBlur={handleDimensionHBlur}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor="code"
          ></label>
          <UseInput
            type="number"
            placeholder=""
            id=""
            // value={editDetForm?.OH_QUANTITY || oHQty}
            // onChange={handleDimensionH}
            // onBlur={handleDimensionHBlur}
            disabled={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-[101%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Item L X W X H
          </label>
          <div className="grid grid-cols-[50%_50%] text-[14px] gap-2 relative">
            <div className="grid grid-cols-[auto_auto_auto_auto] gap-4">
              <UseInput
                type="number"
                placeholder="Length"
                id=""
                // value={dimensionL}
                fieldname="DimensionL"
                value={editDetForm?.DimensionL || dimensionL}
                onChange={handleDimensionL}
                onBlur={handleDimensionLBlur}
              />
              <UseInput
                type="number"
                placeholder="Width"
                fieldname="DimensionW"
                id=""
                value={editDetForm?.DimensionW || dimensionW}
                onChange={handleDimensionW}
                onBlur={handleDimensionWBlur}
              />
              <UseInput
                type="number"
                placeholder="Height"
                fieldname="DimensionH"
                id=""
                value={editDetForm?.DimensionH || dimensionH}
                onChange={handleDimensionH}
                onBlur={handleDimensionHBlur}
              />
            </div>
            <UseSelect
              options={getUoW}
              optionKeyId="UOW_ID"
              optionKeyValue="CODE"
              // value={uow}
              // onChange={handleSelectUoW}
              placeholder="Please Select"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[101%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Box L X W X H
          </label>
          <div className="grid grid-cols-[50%_50%] text-[14px] gap-2 relative">
            <div className="grid grid-cols-[auto_auto_auto_auto] gap-4">
              <UseInput
                type="number"
                placeholder="Length"
                id=""
                value={caseDimL}
                onChange={(e) => {
                  setCaseDimL(e.target.value);
                }}
              />
              <UseInput
                type="number"
                placeholder="Width"
                id=""
                value={caseDimW}
                onChange={(e) => {
                  setCaseDimW(e.target.value);
                }}
              />
              <UseInput
                type="number"
                placeholder="Height"
                id=""
                value={caseDimH}
                onChange={(e) => {
                  setCaseDimH(e.target.value);
                }}
              />
            </div>
            <UseSelect
              id="mySelect"
              options={options}
              placeholder={"Please Select"}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Item Weight
          </label>
          <div className="grid grid-cols-[37%_auto] text-[14px] gap-4 relative">
            <UseInput
              type="number"
              placeholder="Weight"
              id=""
              fieldname="Weight"
              value={editDetForm?.Weight || weight}
              onChange={handleWeight}
            />
            <UseSelect
              options={getUoW}
              optionKeyId="UOW_ID"
              optionKeyValue="CODE"
              value={uow}
              onChange={handleSelectUoW}
              placeholder="UOW"
            />
          </div>
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Shipping Weight
          </label>
          <div className="grid grid-cols-[37%_auto] text-[14px] gap-4 relative">
            <UseInput
              type="number"
              placeholder="Ship Weight"
              id=""
              value={shippingW}
              onChange={(e) => setShippingW(e.target.value)}
            />
            <UseSelect
              options={geyUowSW}
              optionKeyId="label"
              optionKeyValue="label"
              value={uowSW}
              onChange={(e) => {
                setUoWSW(e.target.value);
              }}
              placeholder="UOW"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Box Weight
          </label>
          <div className="grid grid-cols-[37%_auto] text-[14px] gap-4 relative">
            <UseInput
              type="number"
              placeholder="Lenght"
              id=""
              value={boxWeight}
              onChange={(e) => {
                setBoxWeight(e.target.value);
              }}
            />
            <UseSelect
              options={getUoW}
              optionKeyId="UOW_ID"
              optionKeyValue="CODE"
              value={uowBW}
              onChange={handleSelectBWUoW}
              placeholder=".."
            />
          </div>
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Shipping Weight
          </label>
          <div className="grid grid-cols-[37%_auto] text-[14px] gap-4 relative">
            <UseInput
              type="number"
              placeholder="Weight"
              value={caseSWeight}
              onChange={handleSelectCaseSWeight}
            />
            <UseSelect
              options={getUoW}
              optionKeyId="UOW_ID"
              optionKeyValue="CODE"
              value={caseSWeightId}
              onChange={handleSelectCaseSWeightId}
              placeholder=".."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMDetailRight;
