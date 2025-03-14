import React from "react";
import { useDispatch } from "react-redux";
import { setNewDistribution } from "../../../_redux/customerSlice";

const AddDistribution = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setNewDistribution(true));
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full text-[14px] text-customblack"
      >
        Add New
      </button>
    </div>
  );
};

export default AddDistribution;
