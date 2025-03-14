import { CiGrid41 } from "react-icons/ci";
import { LiaPlaneSolid, LiaShipSolid } from "react-icons/lia";
import ShopingDetails from "../shopingDetails/ShopingDetails";
import { useState } from "react";
const dummyArr = [1,2,3];
const RightSideContent = () => {
  const [currButton,setCurrButton] = useState("shippingQue")
  return (
    <div className=" flex flex-col item-start py-[13px] md:pl-[10px] lgdesktop:p-[18px]  md:pr-[3px] px-[13px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <p className="m-0 font-semibold 2xl:text-2xl md:text-sm lgdesktop:text-3xl ">
            Shipment History
          </p>
          <span className=" text-sm 2xl:text-[16px] md:text-[10px] lgdesktop:text-lg text-gray-400 font-light">
            59 active shipments
          </span>
        </div>
        <div className="flex justify-between items-center border-b-2 ">
          <p onClick={()=>setCurrButton("shippingQue")} className={`${currButton==="shippingQue"&&"border-b-2 !border-sky-500"} border-b-2 border-white p-1 mt-3  text-sm 2xl:text-[16px] lgdesktop:text-xl font-medium`}>
            Shipping Que
          </p>
          <div className={`${currButton==="squareIcon"&&"border-b-2 !border-sky-500"}  border-b-2 border-white p-1 mt-2`}>
          <div onClick={()=>setCurrButton("squareIcon")} className={`w-[24px] h-[24px] lgdesktop:w-[30px] lgdesktop:h-[30px] bg-gray-100 rounded-sm flex justify-center items-center border-[0.1px]`}>
            <CiGrid41 />
          </div>
          </div>
        </div>
      </div>
      <div>
      {currButton=="shippingQue"&&dummyArr.map((item,index) => (
        <ShopingDetails index={index} />
      ))}
      {currButton==="squareIcon"&&"Square Icon details"}
      </div>
    </div>
  );
};

export default RightSideContent;
