import React, { useEffect, useState } from "react";
import { setFcLocMax } from "../../../_redux/warehouseSlice";
import { useDispatch } from "react-redux";

const WarehouseLocMax = ({ data, rowData, index }) => {
  const [changeValue, setChangeValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setChangeValue(data);
  }, [data, rowData]);
  const handleChange = (e) => {
    setChangeValue(Number(e.target.value));
    const data = {
      ind: index,
      max: Number(e.target.value),
    };
    dispatch(setFcLocMax(data));
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

export default WarehouseLocMax;
