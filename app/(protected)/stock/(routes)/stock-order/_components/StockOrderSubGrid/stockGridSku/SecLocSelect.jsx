import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSubGridSec } from "../../../redux/stockSlice";

const SecLocSelect = ({ data, rowData, index }) => {

  const dispatch = useDispatch();
  const SelectedWarid = useSelector((state) => state.stockSlices.SelectedWarid);
  const secOptions = useSelector(
    (state) => state.stockSlices.LocationSecOptions
  );
  const [selectedOption, setSelectedOption] = useState(
    data ? data : (secOptions.length === 1 ? secOptions[0] : "")
  );

  const stockOrderFormDataId = useSelector(
    (state) => state.stockSlices.stockOrderFormDataId
  );

  // Handler function to update selected option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(updateSubGridSec({SOId: stockOrderFormDataId, SPId: rowData.INVSTODET_ID, sec: e.target.value, index: index}))
  };

  return (
    <div className="w-full">
      {SelectedWarid.WAR_ID != 2190 && (
        <form className="w-full">
          <select
            className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
            value={selectedOption} // Set the value of the select element
            onChange={handleSelectChange} // Handle change event
          >
            {secOptions.length > 1 && <option value="">Select Sec</option>}
            {secOptions.map(
              (sec, index) =>
                sec !== "FC" && (
                  <option key={index} value={sec}>
                    {sec}
                  </option>
                )
            )}
          </select>
        </form>
      )}
    </div>
  );
};

export default SecLocSelect;
