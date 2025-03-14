import React from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { useSelector } from "react-redux";

const UpdateWarehouseLoc = () => {
  const locationList = useSelector(
    (state) => state.warehouseSlice.locationList
  );
  return (
    <div className="flex flex-col my-4">
      <DropdownMenu label="Update" handleClick={() => {}} />
      <div className="flex  gap-5 my-4">
        <div className="flex gap-2 items-center">
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor="Partner ID"
          >
            Section
          </label>
          <UseInput
            type="text"
            placeholder="Partner ID"
            // value={partnerId}
            // onChange={handlePartner}
            // disabled={SPS === "SPS" ? false : true}
          />
        </div>
        <div className="flex gap-2">
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor="Partner ID"
          >
            Row
          </label>
          <UseInput
            type="text"
            placeholder="Partner ID"
            // value={location?.}
            // onChange={handlePartner}
            // disabled={SPS === "SPS" ? false : true}
          />
        </div>
        <div className="flex gap-2">
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor="Partner ID"
          >
            Bin
          </label>
          <UseInput
            type="text"
            placeholder="Partner ID"
            // value={partnerId}
            // onChange={handlePartner}
            // disabled={SPS === "SPS" ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateWarehouseLoc;
