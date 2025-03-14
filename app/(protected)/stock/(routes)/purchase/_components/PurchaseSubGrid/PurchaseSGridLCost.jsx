import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readySubGridPayLoad,
  subOrderDiscChange,
} from "../../redux/Purchase.slice";

const PurchaseSGridLCost = ({ data, index, rowData, id, obj }) => {
const subData = useSelector((state) => state.PurchaseSlices.subData);
  const focRef = useRef(null);
  const [changeValue, setChangeValue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    let lCost = 0;
    subData.filter((pOrder) => {
        if(pOrder.id == rowData.PURORD_ID) {
          pOrder.product == pOrder.product.filter((item) => {
            if(item.PURORDDET_ID == rowData.PURORDDET_ID ) {  
                let Per = (rowData.COST * rowData.DISCOUNT) / 100;
                let net = rowData.COST - Per;
                lCost = net * rowData.QUANTITY;
            }
          })
        }
        return pOrder;
      });
    setChangeValue(lCost);
  }, [subData]);
  
  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ">
      {changeValue?.toFixed(2)}
    </div>
  );
};

export default PurchaseSGridLCost;
