import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSubGridRow, updatelocations } from "../../../../redux/stockSlice";

const SplitRowLocSelect = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  const SelectedWarid = useSelector((state) => state.stockSlices.SelectedWarid);
  const locationsSet = useSelector((state) => state.stockSlices.LocationsSet);
  const secOptions = useSelector(
    (state) => state.stockSlices.LocationSecOptions
  );
  const rowOptions = useSelector(
    (state) => state.stockSlices.LocationRowOptions
  );
  const [selectedOption, setSelectedOption] = useState(
    data ? data : (rowOptions.length === 1 ? rowOptions[0] : "")
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
    let currLocation = locationsSet.find(
      (item1) =>
        item1?.SECTION == rowData.RACK &&
        item1?.ROW == rowData.SHELF &&
        item1?.BIN == rowData.BIN
    );
    let locId = currLocation?.WARSTOLOC_ID;
    dispatch(updatelocations({SOId: stockOrderFormDataId, SPId: rowData.INVSTODET_ID, row: e.target.value, index: index, col: "row", locId: locId}))
  };

  return (
    <div className="w-full">
      {SelectedWarid.WAR_ID != 2190 && <form className="w-full">
        <select
          className="bg-gray-50 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 border-transparent focus:border-transparent outline-none focus:outline-none"
          value={selectedOption} // Set the value of the select element
          onChange={handleSelectChange} // Handle change event
        >
          {rowOptions.length > 1 && <option value="">Select Row</option>}
          {rowOptions.map(
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

export default SplitRowLocSelect;
