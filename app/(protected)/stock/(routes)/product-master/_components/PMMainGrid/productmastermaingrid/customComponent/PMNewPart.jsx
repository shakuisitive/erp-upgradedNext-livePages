import React from "react";
import { useDispatch } from "react-redux";
import { NewModal, clearPartData } from "../../../../redux/pmSlice";
import useKeyPress from "../../../../../../../../../customHook/useKeyPress";

const PMNewPart = () => {
  const dispatch = useDispatch();
  const handleNew = () => {
    dispatch(clearPartData());
    dispatch(NewModal());
  };
  const onKeyPress = (event) => {
    if (event.key == "n") {
      event.preventDefault();
      dispatch(NewModal());
    }
  };

  useKeyPress(["n"], onKeyPress);
  return (
    <div
      onClick={handleNew}
      className="w-full hover:bg-gray-100 flex justify-center"
    >
      <p className="w-full text-center text-[14px] text-[#323338] py-1">
        + New Product
      </p>
    </div>
  );
};

export default PMNewPart;
