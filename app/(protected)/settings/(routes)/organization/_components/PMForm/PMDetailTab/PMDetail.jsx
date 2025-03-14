import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PMDetailLeft from "./Header/PMDetailLeft";
import PMDetailRight from "./Header/PMDetailRight";
import FileUpload from "./FileUpload";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
// import InputSelect from './../../../../../../../../components/misc/pureComponents/textinput/InputSelect';

const PMDetail = () => {
  const [isHeader, setIsHeader] = useState(true);

  const handleUpload = (files) => {
    // console.log("flies uploaded: "files)
  };

  const btnOption = {
    label: "Apply",
    icon: "",
    onClick: () => {},
  };

  return (
    <div className="bg-white">
      <div className="rounded-md p-2 w-full mt-2">
        <DropdownMenu option={btnOption} />
      </div>
      <div className="py-1 w-full bg-gray-100"></div>

      <div className=" bg-white ml-[35px] my-4">
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
        <div className="ml-[15px] w-full">
          <div className="flex px-4 mr-2 gap-4 tablet:flex-col desktop:flex-row">
            <div className="w-1/2 tablet:w-full desktop:w-1/2">
              <PMDetailLeft />
            </div>
            <div className="w-1/2 tablet:w-full desktop:w-1/2">
              <PMDetailRight />
            </div>
          </div>
        </div>
      )}
      {/* <InputSelect options={options} /> */}
      <FileUpload onUpload={handleUpload} />
    </div>
  );
};

export default PMDetail;
