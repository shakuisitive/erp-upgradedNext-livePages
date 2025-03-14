import React, { useState } from "react";
import { useSelector } from "react-redux";

const BinTo = ({ rowData }) => {
  const [curValue, setCurValue] = useState(rowData?.BIN_NUMBER);
  const binOptions = useSelector((state) => state.pmSlices.binOptions);
  const locationOptions = useSelector(
    (state) => state.pmSlices.locationOptions
  );
  const handleChange = (event) => {
    setCurValue(event.target.value);
    let locId = locationOptions?.find(
      (loc) =>
        loc.SECTION === rowData?.SECTION_TO &&
        loc.ROW === event.target.value &&
        loc.BIN === rowData?.BIN_TO
    )?.WARSTOLOC_ID;
  };

  const textStyle = {
    appearance: "auto",
  };

  return (
    <div className=" flex items-center justify-center gap-3 w-full">
      {binOptions?.length == 1 ? (
        <span className="text-[14px] text-customblack flex items-center justify-center w-full">
          {rowData?.BIN_NUMBER}
        </span>
      ) : (
        <select
          className=" outline-none flex items-center w-full text-center  "
          style={textStyle}
          value={curValue}
          onChange={handleChange}
        >
          {binOptions?.map((elem) => {
            return (
              <option className="w-full" value={elem}>
                {elem}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default BinTo;
