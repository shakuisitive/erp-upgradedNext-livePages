import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAvlQty } from "../../../../../redux/pmSlice";

const PMAvlQty = ({ rowData }) => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAvlQty(rowData?.AVL_QTY_LOT));
  }, [rowData]);
  return (
    <div className="w-full h-full flex justify-center items-center text-[14px] text-customblack">
      {rowData?.AVL_QTY_LOT}
    </div>
  );
};

export default PMAvlQty;
