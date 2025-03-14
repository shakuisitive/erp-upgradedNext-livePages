import React from "react";

const PMLeftSideForm = () => {
  return (
    <div className="border flex flex-col gap-4 items-start w-[100%] max-w-[600px] px-10 py-5 bg-[#d2e7ee] rounded-lg  border-[#77b8ce]">
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">Part #</p>
        <input
          type="text"
          name="part"
          className="max-w-[350px] w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="NC0298722"
        />
      </div>
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">Mfg Part #</p>
        <input
          type="text"
          name="mfg-part"
          className="max-w-[350px] w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="NC0298722"
        />
      </div>
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">Short Description</p>
        <textarea
          type="text"
          name="message"
          className="max-w-[350px] h-[70px] resize-none w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="NC0298722"
        />
      </div>
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">Barcode</p>
        <input
          type="text"
          name="barcode"
          className="max-w-[350px] w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="BC0298722"
        />
      </div>
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">Case UPC</p>
        <input
          type="text"
          name="case-upc"
          className="max-w-[350px] w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="CA0298722"
        />
      </div>
      <div className="flex item-start justify-between gap-[20px] w-[100%]">
        <p className="text-[13px] font-medium m-0">ESN</p>
        <input
          type="text"
          name="esn"
          className="max-w-[350px] w-[100%] bg-white px-3 py-1 shadow-sm outline-none text-[12px]"
          placeholder="C0298722"
        />
      </div>
    </div>
  );
};

export default PMLeftSideForm;
