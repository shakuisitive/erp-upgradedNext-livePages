import Image from "next/image";
import tShirt from "../../../../../../public/media/dashboard/t-shirt.png";
import gloves from "../../../../../../public/media/dashboard/gloves.png";
import gaming from "../../../../../../public/media/dashboard/gaming-tool.png";
import shoes from "../../../../../../public/media/dashboard/shoes.png";
import watch from "../../../../../../public/media/dashboard/watch.png";

const CatagoryData = [
  {
    label: "T-Shirt",
    img: tShirt
  },
  {
    label: "Gaming",
    img: gaming,
  },
  {
    label: "Watch",
    img: watch,
  },
  {
    label: "Gloves",
    img: gloves,
  },
  {
    label: "Shoes",
    img: shoes,
  },
];

const Catagory = (props) => {
  return (
    <div className="my-4 flex items-center xl:gap-8 gap-7 lgdesktop:gap-11 md:gap-3 md:ml-2">
      {CatagoryData?.map((item, index) => (
        <div
          className={`flex flex-col items-center justify-center cursor-pointer ${
            props.currButton === item.label? "border-b-[3px] border-b-blue-600" : ""
          } gap-1 py-1 px-2  rounded-md border-b-[3px] border-white`}
          key={index}
          onClick={()=>props.setCurrButton(item.label)}
        >
          <div className="w-[30px] h-[30px] lgdesktop:w-[70px] lgdesktop:h-[70px] xl:w-[40px] xl:h-[40px] md:w-[25px] md:h-[25px]">
            <Image
              src={item?.img}
              className="object-cover w-full h-full"
              alt="t-shirt"
            />
          </div>
          <p
            className={` ${
              props.currButton===item.label ? "text-black" : "text-gray-400"
            } text-xs lgdesktop:text-lg xl:text-sm  font-medium`}
          >
            {item?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Catagory;
