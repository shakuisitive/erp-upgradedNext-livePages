import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { useSelector, useDispatch } from "react-redux";
import { setKitSubGrid, updateKitSubGrid } from "../redux/pmSlice";

const PMGridMoreOption = ({ index, rowData, data }) => {
  const kitSubGrid = useSelector((state) => state.pmSlices.kitSubGrid);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  // console.log("index , rowData , data: ", index, rowData, data);
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    const itemToDelete = kitSubGrid[index];
    if (
      itemToDelete &&
      (itemToDelete.KIT_ID == null || itemToDelete.avl_qty == "")
    ) {
      const updatedArr = kitSubGrid.filter((_, key) => index !== key);
      dispatch(setKitSubGrid(updatedArr));
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="size-full relative">
      <div className={`px-[10px] bg-white flex justify-center items-center`}>
        <span
          onClick={togglePopover}
          className={`${isOpen == false && "bg-transparent"} ${
            isOpen ? "bg-[#cce5ff]" : "hover:bg-[#dcdfec]"
          } p-1 cursor-pointer rounded-md`}
        >
          <TfiMoreAlt
            className={`text-[14px] ${isOpen == false && "text-transparent"} ${
              isOpen ? "text-customblack" : "group-hover:text-customblack"
            }`}
          />
        </span>
      </div>
      {isOpen && (
        <div
          className="absolute -right-[260px] -top-[25px] mt-2 w-[260px] bg-white border border-gray-300 
               rounded-lg shadow-lg z-50"
        >
          <div className="p-4">
            <div
              className="items-center mr-2 text-customblack text-[14px] flex cursor-pointer p-1 hover:bg-gray-100 rounded-md w-full"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line className="mr-3 text-[16px]" />
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMGridMoreOption;
