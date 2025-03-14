import { CiDeliveryTruck } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { TbCircleDot } from "react-icons/tb";

const ShopingDetails = () => {
  return (
    <div className="border-t-2 py-4 flex flex-col gap-4">
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs font-semibold mb-1">Canada Port</span>
        <div className="flex items-center gap-1">
          <span className="w-[37px] h-[37px] flex items-center justify-center bg-blue-600 rounded-lg">
            <CiDeliveryTruck className="w-[20px] h-[20px] text-white font-bold" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="m-0 text-xs font-medium text-gray-400">
              Hector Container Hotel
            </p>
            <small className="text-xs font-semibold"># S236373827</small>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start relative">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] border flex items-center justify-center border-gray-500 rounded-full">
            <TbCircleDot className="text-red-900" />
          </div>
          <div className="flex flex-col">
            <p className="m-0 text-xs font-medium text-gray-400">
              Messina Harbor
            </p>
            <small className="text-xs font-semibold"># S8288219192</small>
          </div>
        </div>
        <div className="flex flex-col gap-4"></div>
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] border flex items-center justify-center border-gray-500 rounded-full">
            <GrLocation className="text-gray-400" />
          </div>
          <div className="flex flex-col">
            <p className="m-0 text-xs font-medium text-gray-400">
              ICS 3 Box | $14.96
            </p>
            <small className="text-xs font-semibold"># S2363738273</small>
          </div>
        </div>
        <div
          className="absolute bg-gray-500"
          style={{
            width: "0.5px",
            top: "37%",
            left: "5%",
            bottom: "37%",
            transform: "translateX(-50%)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ShopingDetails;
