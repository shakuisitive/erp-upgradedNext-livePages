import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFcLocMin } from "../../../_redux/warehouseSlice";

const WarehouseLocMin = ({ data, rowData, index }) => {
  const [changeValue, setChangeValue] = useState();
  useEffect(() => {
    setChangeValue(data);
  }, [data, rowData]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setChangeValue(Number(e.target.value));
    const data = {
      ind: index,
      min: Number(e.target.value),
    };
    dispatch(setFcLocMin(data));
    // console.log("checking data", data);
  };
  return (
    <div className="w-full flex items-center  px-[3px] justify-center ">
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={handleChange}
        value={changeValue}
        disabled={rowData?.PAR_ID ? false : true}
      />
    </div>
  );
};

export default WarehouseLocMin;
