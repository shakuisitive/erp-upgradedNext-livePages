import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { FaCircleInfo } from "react-icons/fa6";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  clearKitSubGrid,
  setKitQty,
  updateKitWarId,
} from "../../../../redux/pmSlice";
import VerifyModal from "../../../../../../../../../components/misc/pureComponents/modal/VerifyModal";

const KitLeft = ({
  kitCode,
  setKitCode,
  kitName,
  setKitName,
  kitDesc,
  setKitDesc,
  kitBarcode,
  setKitBarcode,
  kitOHQty,
  setKitOHQty,
  kitWarId,
  setKitWarId,
  kitCost,
  kitPrice,
  isError,
  verifiedCode,
  setKitPrice,
}) => {
  const [validation, setValidation] = useState(true);
  const [isWarehouse, setIsWarehouse] = useState(false);
  const [newWarId, setNewWarId] = useState(null);
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getWarehouse = useSelector((state) => state.commonSlices.getWarehouse);
  const editKitForm = useSelector((state) => state.pmSlices.editKitForm);
  const kitSubGrid = useSelector((state) => state.pmSlices.kitSubGrid);
  const dispatch = useDispatch();
  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  const handleWarId = (e) => {
    const selectedWarId = e.target.value;

    if (kitWarId && selectedWarId !== kitWarId) {
      setNewWarId(selectedWarId);
      setIsWarehouse(true);
    } else {
      setKitWarId(selectedWarId);
      dispatch(updateKitWarId(selectedWarId));
    }
  };

  const handleOnClose = () => {
    setIsWarehouse(false);
    setNewWarId(null);
  };

  const handleWarehouseEmpty = () => {
    setKitWarId(newWarId);
    dispatch(updateKitWarId(newWarId));
    dispatch(clearKitSubGrid());
    setIsWarehouse(false);
    setNewWarId(null);
  };
  const handleCode = (e) => {
    setKitCode(e.target.value);

    const payloadUniquePart = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "KIT_CODE",
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

  const handleName = (e) => {
    setKitName(e.target.value);
  };

  const handleDesc = (e) => {
    setKitDesc(e.target.value);
  };
  const handleBarcode = (e) => {
    setKitBarcode(e.target.value);
  };
  const handleOHQty = (e) => {
    setKitOHQty(e.target.value);
    dispatch(setKitQty(e.target.value));
  };

  useEffect(() => {
    dispatch(setKitQty(kitOHQty));
  }, [setKitOHQty, kitSubGrid, setKitWarId]);

  // const handleWarId = (e) => {
  //   const newWarId = e.target.value;
  //   setKitWarId(newWarId);
  //   dispatch(updateKitWarId(newWarId));

  //   if (kitWarId && newWarId !== kitWarId) {
  //     setIsWarehouse(true);
  //     if (isWarehouseChange) {
  //       setKitWarId(newWarId);
  //       setIsWarehouseChange(!isWarehouseChange);
  //     } else {
  //       setKitWarId(kitWarId);
  //     }
  //   }
  // };

  const handleKitPriceChange = (e) => {
    const value = Number(e.target.value);
    setKitPrice(value);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Kit # <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={kitCode}
          onChange={handleCode}
          // onBlur={handlePartBlur}
          disabled={
            editKitForm?.CODE && verifiedCode?.ALLOW_ADMIN_OVERRIDE != "Y"
              ? true
              : false
          }
          placeholder=" Kit Code"
        />
        {!kitCode && kitCode != "" && isError && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Invalid Kit Code </span>
          </div>
        )}
        {!validation && (
          <div className="items-center flex gap-2 left-[170px] text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">Kit code already exist </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={kitName}
            isRequired={true}
            onChange={handleName}
            placeholder=" Kit Name"
          />
          {!kitName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Barcode
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={kitBarcode}
          onChange={handleBarcode}
          placeholder=" Barcode"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Description
        </label>
        <UseInput
          type="text"
          isRequired={true}
          value={kitDesc}
          onChange={handleDesc}
          placeholder=" Description "
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={getWarehouse}
            optionKeyId="WAR_ID"
            optionKeyValue="WAREHOUSE"
            value={kitWarId}
            onChange={handleWarId}
            disabled={
              editKitForm?.WAR_ID && verifiedCode?.ALLOW_ADMIN_OVERRIDE != "Y"
                ? true
                : false
            }
            placeholder="Please Select"
          />
          {!kitWarId && isError && (
            <div className="items-center flex gap-2 text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Warehouse Selection is Mandatory{" "}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] mb-[12px] justify-between">
        <div className="grid grid-cols-[170px_auto]">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            OH. Qty <span className="text-red-500 ">*</span>
          </label>
          <div className="flex flex-col">
            <UseInput
              type="text"
              disabled={
                editKitForm?.OH_QTY && verifiedCode?.ALLOW_ADMIN_OVERRIDE != "Y"
                  ? true
                  : false
              }
              value={kitOHQty}
              onChange={handleOHQty}
            />
            {!kitOHQty && isError && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500 ">Please Enter OH Quantity </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[90px_auto]">
          <label
            className="w-[90px] p-[8px] font-[500] text-[14px]"
            htmlFor="code"
          >
            Avl. Qty
          </label>
          <UseInput type="text" disabled={true} value={kitOHQty} />
        </div>
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] justify-between">
        <div className="grid grid-cols-[170px_auto]">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Cost
          </label>
          <UseInput type="text" disabled={true} value={Number(kitCost)} />
        </div>
        <div className="grid grid-cols-[90px_auto]">
          <label
            className="w-[90px] p-[8px] font-[500] text-[14px]"
            htmlFor="code"
          >
            Price <span className="text-red-600">*</span>
          </label>
          <UseInput
            type="text"
            disabled={verifiedCode?.ALLOW_ADMIN_OVERRIDE != "Y" ? true : false}
            value={Number(kitPrice)}
            onChange={handleKitPriceChange}
          />
          {/* {!kitPrice && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500 ">price required </span>
              </div>
            )} */}
        </div>
        {isWarehouse && (
          <VerifyModal
            onClose={handleOnClose}
            cancle={"Cancle"}
            verify={"Continue"}
            msg={"All rows will reset. Are you sure to continue"}
            action={handleWarehouseEmpty}
          />
        )}
      </div>
    </div>
  );
};

export default KitLeft;
