import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBin } from "../../redux/TransferSlice";

const BinLocSelect = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  // const binOptions = useSelector(
  //   (state) => state.TransferSlice.LocationBinOptions
  // );
  const binOptions = useSelector(
    (state) => state.TransferSlice.LocationBinOptions[index]
  );
  // console.log(binOptions);

  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const [selectedOption, setSelectedOption] = useState(data);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const data = {
      id: rowData?.INVTRADET_ID,
      bin: e.target.value,
      ind: index,
    };
    dispatch(UpdateBin(data));
  };

  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[2px] justify-center">
      <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption}
          onChange={handleSelectChange}
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
