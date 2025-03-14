import React from "react";
import { useSelector } from "react-redux";

const TrfQuantity = ({rowData}) => {
    const checkedItems = useSelector((state) => state.pmSlices.isCheckedFItem);
    const isMatchingId = () => {
        return checkedItems.some(item => item.rowData?.WARSTOLOC_ID === rowData?.WARSTOLOC_ID);
      };
  return (
    <div className="text-[14px] text-customblack flex items-center justify-center w-full">
      {
        isMatchingId() ? rowData?.AVL_QUQNTITY : ''
      }
    </div>
  );
};

export default TrfQuantity;
