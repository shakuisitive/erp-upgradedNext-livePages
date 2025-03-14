import React from "react";
import PMLeftSideForm from "../ProductDetailComponents/PMLeftSideForm";
import PMRightSideForm from "../ProductDetailComponents/PMRightSideForm";

const PMDetailTab = () => {
  return (
    <div className="flex flex-col gap-3 p-[20px] w-[100%]">
      <div className="text-[16px] font-[500]">Information</div>
      <div className="flex items-center gap-5 w-[100%]">
        <PMLeftSideForm />
        <PMRightSideForm />
      </div>
    </div>
  );
};

export default PMDetailTab;
