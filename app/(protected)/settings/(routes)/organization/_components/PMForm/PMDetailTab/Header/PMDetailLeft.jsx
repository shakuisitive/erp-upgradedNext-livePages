import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import TextArea from "../../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import UseSelect from "./../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { useDispatch, useSelector } from "react-redux";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { LeftFormData, MfgPartNumber } from "../../../../redux/pmSlice";

const PMDetailLeft = () => {
  //states
  const [selectedValue, setSelectedValue] = useState("");
  const getWarehouse = useSelector((state) => state.commonSlices.getWarehouse);
  // console.log("warehouse : ", getWarehouse);

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const [formData, setFormData] = useState({
    partNumber: "",
    mfgPartNumber: "",
    name: "",
    description: "",
    warehouseCode: "",
    warehouseName: "",
  });
  useEffect(() => {
    if (formData) {
      dispatch(LeftFormData(formData));
    }
  }, [formData]);
  //for Mulitple
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Functions
  // console.log("FormData", formData);
  const handlePartChange = (e) => {
    setFormData({
      ...formData,
      partNumber: e.target.value,
    });
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
    // dispatch(LeftFormData(formData));
  };
  const handleMfgPartChange = (e) => {
    setFormData({
      ...formData,
      mfgPartNumber: e.target.value,
    });
  };
  const handleDecription = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };
  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const handleSelectWarehouse = (selectedOption) => {
    setSelectedValue(selectedOption);
    const warehouseParts = selectedOption.WAREHOUSE.split(" - ");
    const warehouseCode = warehouseParts[0];
    const warehouseName = warehouseParts[1];

    setFormData({
      ...formData,
      warehouseCode: warehouseCode,
      warehouseName: warehouseName,
    });
  };

  //Arrays
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Part#
        </label>
        <UseInput
          type="text"
          value={formData.partNumber}
          onChange={handlePartChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Mfg Part#
        </label>
        <UseInput
          type="text"
          value={formData.mfgPartNumber}
          onChange={handleMfgPartChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name
        </label>
        <UseInput
          type="text"
          value={formData.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Short Description
        </label>
        <TextArea onChange={handleDecription} value={formData.description} />
        {/* <textarea
          id="code"
          className="bg-white focus:outline-none focus:unset h-[100px] border-b py-[8px] pl-[12px] pr-[36px]"
        /> */}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Case UPC
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          ESN
        </label>
        <UseInput
          type="text"
          // value={value}
          // onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country Of Origins
        </label>
        <UseSelect
          id="mySelect"
          options={options}
          value={selectedValue}
          // onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse
        </label>
        <UseSelect
          id="mySelect"
          options={getWarehouse}
          optionKey="WAREHOUSE"
          value="WAR_ID"
          onChange={handleSelectWarehouse}
        />
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] justify-between">
        <div className="grid grid-cols-[170px_auto]">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            OH Qty
          </label>
          <UseInput
            type="text"
            disabled="true"
            //value={value}
            // onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-[90px_auto]">
          <label
            className="w-[90px] p-[8px] font-[500] text-[14px]"
            htmlFor="code"
          >
            AV Qty
          </label>
          <UseInput
            type="text"
            disabled={true}
            //value={value}
            // onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PMDetailLeft;
