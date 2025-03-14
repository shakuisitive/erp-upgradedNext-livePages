import React from "react";
import { useDispatch } from "react-redux";
import { setNewShipTo } from "../../../_redux/customerSlice";

const AddShipTo = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setNewShipTo(true));
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

export default AddShipTo;
