import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import TextArea from "../../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import UseSelect from "./../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { useDispatch, useSelector } from "react-redux";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import {
  LeftFormData,
  MfgPartNumber,
  newFormData,
  setCostDrawer,
  setEditDetForm,
  setField,
} from "../../../../redux/pmSlice";
import Modal from "../../../../../../../../../components/misc/pureComponents/modal/Modal";
import { FaCircleInfo } from "react-icons/fa6";
import RightDrawer from "../../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PMCostDrawer from "./PMCostDrawer";
const PMDetailLeft = ({
  partName,
  setPartName,
  partNumber,
  setPartNumber,
  mfgPartNumber,
  setMfgPartNumber,
  description,
  setDescription,
  partCase,
  setPartCase,
  warID,
  setWarId,
  cost,
  setCost,
  price,
  setPrice,
  barcode,
  setBarcode,
  partESN,
  setPartESN,
  isError,
  verifiedCode,
  countryOrigin,
  setCountryOrigin,
}) => {
  //states
  const [selectedValue, setSelectedValue] = useState("");
  const [validation, setValidation] = useState(true);
  const [ohQty, setOhQty] = useState("");
  const [avlQty, setAvlQty] = useState("");
  // const [costDrawer, setCostDrawer] = useState();
  const getWarehouse = useSelector((state) => state.commonSlices.getWarehouse);

  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);
  const costDrawer = useSelector((state) => state.pmSlices.costDrawer);
  const landCost = useSelector((state) => state.pmSlices.landCost);
  const listPrice = useSelector((state) => state.pmSlices.listPrice);
  const PARWAR_ID = editDetForm?.PAR_WAR_ID;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const handlePartChange = (e) => {
    // const pNumber = e.target.value;
    setPartNumber(e.target.value);

    const payloadUniquePart = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "SKU",
      },
      method: "GetCodeUniqueValidation",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    sendRequest(
      ItemMaster.GetCodeUniqueValidation,
      "POST",
      payloadUniquePart,
      getPartNumber,
      token
    );
  };

  const getPartNumber = (data) => {
    if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const handleMfgPartChange = (e) => {
    setMfgPartNumber(e.target.value);
  };
  const handleDecription = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setPartName(e.target.value);
  };
  const handleCaseChange = (e) => {
    setPartCase(e.target.value);
  };
  const handleESN = (e) => {
    setPartESN(e.target.value);
  };

  const handleCost = () => {
    dispatch(setCostDrawer(false));
  };

  const handleCostBlur = () => {
    if (cost) {
      const parsedCost = parseFloat(cost).toFixed(2);
      setCost(parsedCost);
    }
  };
  const handlePrice = (e) => {
    dispatch(setCostDrawer(false));
  };
  const handlePriceBlur = () => {
    if (price) {
      const parsedPrice = parseFloat(price).toFixed(2);
      setPrice(parsedPrice);
    }
  };
  const handleBarcode = (e) => {
    setBarcode(e.target.value);
  };

  const handleSelectWarehouse = (e) => {
    setWarId(e.target.value);
  };

  //Arrays

  const options = [
    { id: "1", label: "Canada" },
    { id: "2", label: "USA" },
    // { id: "3", label: "Option 3" },
  ];
  const ohPayload = {
    data: {
      WAR_ID: warID,
      PAR_ID: editDetForm?.PAR_ID,
    },
    action: "InventoryWeb",
    method: "GetPartOnhandAvlQty",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleOhAvlQty = (data) => {
    // console.log("oh: ", data?.Result?.ONHAND_QUANTITY);
    // console.log("oh: ", data?.Result);
    setOhQty(data?.Result[0]?.ONHAND_QUANTITY);
    setAvlQty(data?.Result[0]?.AVL_QUANTITY);
  };
  useEffect(() => {
    if (PARWAR_ID !== warID) {
      sendRequest(
        ItemMaster.GetPartOnhandAvlQty,
        "POST",
        ohPayload,
        handleOhAvlQty,
        token
      );
    }
  }, [warID]);
  // console.log("oh and avl: ", ohQty, avlQty);

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Part <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={partNumber}
          onChange={handlePartChange}
          placeholder="Part"
          disabled={
            editDetForm?.PAR_CODE && verifiedCode?.ALLOW_ADMIN_OVERRIDE != "Y"
              ? true
              : false
          }
        />
        {isError && !partNumber && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Part Number required</span>
          </div>
        )}
        {!validation && partNumber && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Invalid Part Number </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Mfg Part <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          value={mfgPartNumber}
          placeholder="Mfg Part"
          isRequired={true}
          onChange={handleMfgPartChange}
        />
        {isError && !mfgPartNumber && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Mfg is required</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name<span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={partName}
          placeholder="Name"
          onChange={handleNameChange}
        />
        {isError && !partName && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Please enter name</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Short Description<span className="text-red-600">*</span>
        </label>
        <TextArea
          onChange={handleDecription}
          isRequired={true}
          value={description}
          placeholder="Description"
        />
        {isError && !description && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Description is required</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Barcode <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={barcode}
          onChange={handleBarcode}
          placeholder="Barcode"
        />
        {isError && !barcode && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Barcode is required</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Case UPC <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={partCase}
          onChange={handleCaseChange}
          placeholder="Case UPC"
        />
        {isError && !partCase && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Case UPC is required</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          ESN
        </label>

        <UseInput
          type="text"
          placeholder="ESN"
          value={partESN}
          onChange={handleESN}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country Of Origins
        </label>
        <UseSelect
          options={options}
          optionKeyId="id"
          optionKeyValue="label"
          value={countryOrigin}
          onChange={(e) => setCountryOrigin(e.target.value)}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse
        </label>

        <UseSelect
          options={getWarehouse}
          optionKeyId="WAR_ID"
          optionKeyValue="WAREHOUSE"
          value={warID}
          onChange={handleSelectWarehouse}
          placeholder="OVERALL"
        />
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] justify-between mb-[12px]">
        <div className="grid grid-cols-[170px_auto] ">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Cost <span className="text-red-600">*</span>
          </label>

          <UseInput
            type="text"
            disabled={!costDrawer ? true : false}
            placeholder="Cost"
            value={landCost}
            onClick={handleCost}
            // onChange={handleCost}
            onBlur={handleCostBlur}
          />
          {isError && !landCost && (
            <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Cost is required</span>
            </div>
          )}
        </div>
        <div>
          <div className="grid grid-cols-[90px_auto]">
            <label
              className="w-[90px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Price <span className="text-red-600">*</span>
            </label>
            <UseInput
              type="text"
              disabled={!costDrawer ? true : false}
              placeholder="Price"
              value={listPrice}
              onClick={handlePrice}
              onBlur={handlePriceBlur}
            />
          </div>
          {isError && !listPrice && (
            <div className="items-center flex gap-2 left-[90px] text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500  w-full">Price is required</span>
            </div>
          )}
        </div>
        {listPrice && landCost && Number(listPrice) < Number(landCost) && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500">
              Price should not be less than cost
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] justify-between mb-[12px]">
        <div className="grid grid-cols-[170px_auto] ">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            OH Qty
          </label>
          <UseInput
            type="text"
            disabled={true}
            value={ohQty || editDetForm?.OH_QUANTITY}
            placeholder="OH Qty"

            // onChange={handlePrice}
            // onBlur={handlePriceBlur}
          />
        </div>
        <div>
          <div className="grid grid-cols-[90px_auto]">
            <label
              className="w-[90px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Avl Qty
            </label>
            <UseInput
              type="text"
              disabled={true}
              value={avlQty || editDetForm?.QTY_AVAILABLE}
              placeholder="Avl Qty"

              // onChange={handleCost}
              // onBlur={handleCostBlur}
            />
          </div>
        </div>
      </div>

      {/* <PMCostDrawer /> */}

      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PMDetailLeft;
