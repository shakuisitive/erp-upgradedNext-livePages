import Image from "next/image";
import tShirt from "../../../../../../public/t-shirt.png";
import gloves from "../../../../../../public/gloves.png";
import gaming from "../../../../../../public/gaming-tool.png";
import shoes from "../../../../../../public/shoes.png";
import watch from "../../../../../../public/watch.png";

const CatagoryData = [
  {
    label: "T-Shirt",
    img: tShirt,
    isActive: true,
  },
  {
    label: "Gaming",
    img: gaming,
    isActive: false,
  },
  {
    label: "Watch",
    img: watch,
    isActive: false,
  },
  {
    label: "Gloves",
    img: gloves,
    isActive: false,
  },
  {
    label: "Shoes",
    img: shoes,
    isActive: false,
  },
];

const Catagory = () => {
  return (
    <div className="my-4 flex items-center gap-7">
      {CatagoryData?.map((item, index) => (
        <div
          className={`flex flex-col items-center justify-center ${item?.isActive ? 'border-b-2 border-b-blue-600' : ''} gap-1 py-1 px-2 border-[0.3px] rounded-md`}
          key={index}
        >
          <Image src={item?.img} width={30} height={30} alt="t-shirt" />
          <span className={` ${item?.isActive ? 'text-black' : 'text-gray-400'} text-xs  font-medium`}>
            {item?.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Catagory;
