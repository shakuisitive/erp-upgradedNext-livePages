import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateRow } from "../../redux/CycleCountSlice";

const RowLocSelect = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  
  const rowOptions = useSelector(
    (state) => state.CycleCountSlice.LocationRowOptions
  );
  const CycleCountForm = useSelector((state) => state.CycleCountSlice.CycleCountForm[0]);
  const [selectedOption, setSelectedOption] = useState(data);
  
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const data = {
      id: rowData.PHYCOUDET_ID,
      bin: e.target.value,
      ind: index,
    };
    dispatch(UpdateRow(data));
  };

  return (
    <div className="w-full">
      <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption} // Set the value of the select element
          onChange={handleSelectChange} // Handle change event
          disabled={
            CycleCountForm.PC_STATUS == "NEW"
              ? false
              : CycleCountForm.PC_STATUS  == "Initiated"
              ? false
              : true
          }
        >
          {rowOptions.map(
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
