import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateSubBin,
 
} from "../../redux/TransferSlice";

import useApiFetch from "../../../../../../../customHook/useApiFetch";

const BinLocSelect = ({ data, rowData, index, id }) => {
  const dispatch = useDispatch();
  const binOptions = useSelector(
    (state) => state.TransferSlice.LocationBinOptions[index]
  );
  const [selectedOption, setSelectedOption] = useState(data);
 
const subData = useSelector((state) => state.TransferSlice.subData[0]);
 

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const binData = {
      PId: rowData.INVTRA_ID,
      bin: e.target.value,
      RId: rowData.INVTRADET_ID,
      ind: index,
    };
    dispatch(UpdateSubBin(binData));
   
  };

  return (
    <div className="w-full">
      <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption}
          onChange={handleSelectChange} 
          disabled={subData?.form[0]?.TRANSFER_STATUS == "NEW" ? false : true}
        >
          <option value="">Select</option>

          {binOptions?.map(
            (sec, ind) =>
              sec !== "FC" && (
                <option key={ind} value={sec}>
                  {sec}
                </option>
              )
          )}
        </select>
      </form>
    </div>
  );
};

export default BinLocSelect;
