import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSubGridBin } from "../../../redux/stockSlice";


const BinLocSelect = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  const SelectedWarid = useSelector((state) => state.stockSlices.SelectedWarid);
  const rowOptions = useSelector(
    (state) => state.stockSlices.LocationRowOptions
  );
  const binOptions = useSelector(
    (state) => state.stockSlices.LocationBinOptions
  );
  const [selectedOption, setSelectedOption] = useState(
    data ? data : (binOptions.length === 1 ? binOptions[0] : "")
  );
  const stockOrderFormDataId = useSelector(
    (state) => state.stockSlices.stockOrderFormDataId
  );

  // const subData = useSelector((state) => state.stockSlices.subData);
  // const subDataObj = subData.find((item) => item.id === id);
  // const product = subDataObj.product.find((item) => item.INVSTODET_ID === rowId);

  // Handler function to update selected option
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(updateSubGridBin({SOId: stockOrderFormDataId, SPId: rowData.INVSTODET_ID, bin: e.target.value, index: index}))
  };

  return (
    <div className="w-full">
      {SelectedWarid.WAR_ID != 2190 && <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption} // Set the value of the select element
          onChange={handleSelectChange} // Handle change event
        >
          {binOptions.length > 1 && <option value="">Select Bin</option>}
          {binOptions.map(
            (sec, index) =>
              sec !== "FC" && (
                <option key={index} value={sec}>
                  {sec}
                </option>
              )
          )}
        </select>
      </form>
      }
    </div>
  );
};

export default BinLocSelect;
