import { list } from "postcss";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPartPricePayload } from "../../../_redux/customerSlice";

const CustListPrice = ({ rowData, id, index, data }) => {
  const [listPrice, setListPrice] = useState("");
  const dispatch = useDispatch();
  const accessFlag = useSelector((state) => state.customerSlice.accessFlag);
  const partPriceOverrideList = useSelector(
    (state) => state.customerSlice.partPriceOverrideList
  );
  const newPartPriceId = useSelector(
    (state) => state.customerSlice.newPartPriceId
  );

  useEffect(() => {
    setListPrice(data);
  }, [data, rowData]);

  const handleListPrice = (e) => {
    setListPrice(Number(e.target.value));
  };
  const handleBlurListPrice = () => {
    if (listPrice !== null) {
      const data = {
        id: rowData.PAR_ID,
        list_price: listPrice,
        obj: rowData,
      };
      dispatch(setPartPricePayload(data));
    }
  };
  const focRef = useRef(null);

  return (
    <div className="w-full flex items-center px-[3px] justify-center ">
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="text"
        onChange={handleListPrice}
        onBlur={handleBlurListPrice}
        value={listPrice}
        ref={focRef}
        disabled={
          accessFlag?.ALLOW_ADMIN_OVERRIDE || newPartPriceId ? false : true
        }
      />
    </div>
  );
};

export default CustListPrice;
