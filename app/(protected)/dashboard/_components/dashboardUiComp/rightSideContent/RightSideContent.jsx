import { CiGrid41 } from "react-icons/ci";
import { LiaPlaneSolid, LiaShipSolid } from "react-icons/lia";
import ShopingDetails from "../shopingDetails/ShopingDetails";


const RightSideContent = () => {
  return (
    <div className="text-balck flex flex-col pt-4 item-start gap-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start">
          <p className="m-0 font-semibold text-md">Shipment History</p>
          <span className=" text-sm text-gray-400 font-light">
            59 active shipments
          </span>
        </div>
        <div className="flex justify-between items-center px-3">
          <p className="m-0 text-sm font-medium">Shipping Que</p>
          <span className="w-[24px] h-[24px] bg-gray-100 rounded-sm flex justify-center items-center border-[0.1px]">
            <CiGrid41 />
          </span>
        </div>
      </div>
       {
        [1,2,3].map((item, ind) => (
            <ShopingDetails key={ind} />
        ))
       }
    </div>
  );
};

export default RightSideContent;
