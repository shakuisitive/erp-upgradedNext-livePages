import { CiDeliveryTruck } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { TbCircleDot } from "react-icons/tb";

const ShopingDetails = (props) => {
  return (
    <div className={`${props.index.toString()!=="0"?"border-t-[2px]":""} xl:py-[20px] 2xl:py-[22px] lgdesktop:py-[24px] lg:py-[18px] md:py-[10px] flex flex-col md:gap-0  lg:gap-[10px] overflow-auto`}>
      <div className="flex justify-between items-start    text-sm  ">
        <div className="flex flex-row items-start gap-2">
        <div className="w-[37px] h-[37px] xl:w-[30px] lg:h-[30px] lg:w-[30px] 2xl:w-[40px] 2xl:h-[40px] xl:h-[30px] md:w-[25px] md:h-[25px] lgdesktop:w-[50px] lgdesktop:h-[50px] flex items-center justify-center bg-sky-500 rounded-lg">
          <CiDeliveryTruck className="w-[20px] h-[20px] 2xl:w-[35px] 2xl:h-[35px] lgdesktop:w-[45px] lgdesktop:h-[45px] text-white font-bold" />
        </div>
        <div className="  ">
            <div className="lgdesktop:text-xl lg:text-[10px] 2xl:text-[18px] xl:text-[16px] md:text-[8px] font-medium text-gray-400 ">
              Hector Container Hotel
            </div>
          
          <div className="font-semibold xl:text-[10px]  2xl:text-[12px] lg:text-[8px] md:text-[6px] lgdesktop:text-[14px]">
            # S236373827
          </div>
        </div>
        </div>
        <span className="text-xs lg:text-[10px] xl:text-[12px] 2xl:text-[14px] md:text-[8px] lgdesktop:text-xl font-bold">
          Canada Port
        </span>
      </div>

      <div className="flex flex-col md:gap-1 lg:gap-2 xl:gap-3 2xl:gap-4 items-start relative">
        <div className="flex items-center gap-2">
          <div className="xl:w-[30px] xl:h-[30px] 2xl:w-[35px] 2xl:h-[35px] lg:w-[25px] md:h-[20px] md:w-[20px] lg:h-[25px] lgdesktop:w-[40px] lgdesktop:h-[40px] border flex items-center justify-center border-gray-500 rounded-full">
            <TbCircleDot className=" text-red-900 "  />
          </div>
          <div className="flex flex-col text-xs md:text-[9px] lg:text-[11px] xl:text-[13px] 2xl:text-[15px] lgdesktop:text-xl">
            <p className="m-0   font-medium text-gray-400 ">Messina Harbor</p>
            <small className=" font-semibold"># S8288219192</small>
          </div>
        </div>
        <div className="flex flex-col gap-4"></div>
        <div className="flex items-center gap-2">
          <div className="xl:w-[30px] xl:h-[30px] lg:w-[25px] lg:h-[25px] md:w-[20px] md:h-[20px] 2xl:w-[35px] 2xl:h-[35px] lgdesktop:w-[40px] lgdesktop:h-[40px]  border flex items-center justify-center border-gray-500 rounded-full">
            <GrLocation className="text-gray-400" />
          </div>
          <div className="flex flex-col md:text-[9px] lg:text-[11px] xl:text-[13px] 2xl:text-15px text-xs lgdesktop:text-xl">
            <p className="m-0  font-medium text-gray-400 ">
              ICS 3 Box | $14.96
            </p>
            <small className=" font-semibold"># S2363738273</small>
          </div>
        </div>
        {/* <div
            className="absolute bg-gray-500"
            style={{
              width: "0.5px",
            //   height: "calc(100% - 20px)",
              top: "37%",
              left: "5%",
              bottom: '37%',
              transform: "translateX(-50%)",
            }}
          ></div> */}
      </div>
    </div>
  );
};

export default ShopingDetails;
