import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const SectionTo = ({ rowData }) => {
  console.log(rowData?.RACK, 'rack')
  const [curValue, setCurValue] = useState(rowData?.RACK);
  const sectionToData = useSelector((state) => state.pmSlices.sectionToData);
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

    console.log(locId, 'locid')
  };

  const textStyle = {
    appearance: "auto",
  };

  return (
    <div className=" flex items-center justify-center gap-3 w-full">
      {sectionToData?.length == 1 ? (
        <span className="text-[14px] text-customblack flex items-center justify-center w-full">{rowData?.RACK}</span>
      ) : (
        <select
          className=" outline-none flex items-center w-full text-center  "
          style={textStyle}
          value={curValue}
          onChange={handleChange}
        >
          {sectionToData?.map((elem) => {
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

export default SectionTo;
