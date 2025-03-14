import React from "react";
import { setDiscount } from "../../../redux/Purchase.slice";
import { useDispatch } from "react-redux";

const DiscGrid = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  const setChange = (e) => {
    let Per = (rowData.COST * e.target.value) / 100;
    // // console.log('discount data' , Per);

    // let net = rowData.COST - Per;
    // const dataDis = {
    //   cat: "dis",
    //   data: net,
    //   indexR: index,
    //   val: e.target.value,
    // };
    // dispatch(setDiscount(dataDis));
    // // console.log('check rowData in %' , rowData , Per , net);
  };
  return (
    <div className="flex justify-center items-center w-full bg-[#E1EFF2] px-[3px] text-[14px] text-customblack">
      <div className="relative">
        <input
          onChange={setChange}
          className="w-full text-center outline-none py-[3px]"
          type="text"
          value={data ? data : "0.00"}
        />
        <span className="absolute right-1">%</span>
      </div>
    </div>
  );
};

export default DiscGrid;
