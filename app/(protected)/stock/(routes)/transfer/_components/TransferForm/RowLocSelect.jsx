import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateRow } from "../../redux/TransferSlice";

const RowLocSelect = ({ data, rowData, index }) => {
  const dispatch = useDispatch();

  const rowOptions = useSelector(
    (state) => state.TransferSlice.LocationRowOptions[index]
  );
  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const [selectedOption, setSelectedOption] = useState(data);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const data = {
      id: rowData.INVTRADET_ID,
      row: e.target.value,
      ind: index,
    };
    dispatch(UpdateRow(data));
  };

  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[2px] justify-center">
      <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption} // Set the value of the select element
          onChange={handleSelectChange} // Handle change event
          // disabled={
          //   TransferForm.TRANSFER_STATUS == "NEW"
          //     ? false
          //     : TransferForm.TRANSFER_STATUS  == "Initiated"
          //     ? false
          //     : true
          // }
        >
          <option value="">Select</option>
          {rowOptions?.map(
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

export default RowLocSelect;
