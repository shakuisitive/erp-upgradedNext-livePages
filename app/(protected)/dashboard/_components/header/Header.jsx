import Image from "next/image";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import logo from "../../../../../public/media/dashboard/logo.svg";
import Navbar from "../pagesNavbar/Navbar";
import Select, { components } from "react-select";
import canadaFlag from "../../../../../public/media/dashboard/canadaFlag.png";
import SelectCountry from "../../home/_components/select/SelectCountry";
const Header = () => {
  const options = [
    { label: "Canada", image: "/media/dashboard/canadaFlag.png" },
    { label: "Pakistan", image: "/media/dashboard/canadaFlag.png" },
    { label: "Russia", image: "/media/dashboard/canadaFlag.png" },
    { label: "USA", image: "/media/dashboard/canadaFlag.png" },
  ];

  // const CustomOption = ({data:option,innerProps,...props}) => {
  //   // const optionStyles = styles.option(option, isSelected);

  //   console.log(props)
  //   return (
  //     <div {...innerProps} style={{ display: 'flex', alignItems: 'center' }}>
  //       {option.image && <img src={option.image} alt={option.label} style={{ width: 25, height: 25, marginRight: 10 }} />}
  //       <span>{option.label}</span>
  //     </div>

  //   );
  // };
  // const CustomControl = ({ innerProps,children ,...selectProps}) => {
  //   console.log(selectProps)
  //   return (
  //     // <div style={{ display: 'flex', alignItems: 'center' }}>
  //     //   {selectProps.getValue().length > 0 && selectProps.getValue()[0].image && (
  //     //     <img
  //     //       src={selectProps.getValue()[0].image}
  //     //       alt={selectProps.getValue()[0].label}
  //     //       style={{ width: 25, height: 25, marginRight: 10 }}
  //     //     />
  //     //   )}
  //       <components.Control {...innerProps}>{children}</components.Control>
  //     // </div>
  //   );
  // };

  return (
    <div className="flex flex-col gap-1 pl-10 pr-5">
      <div className="flex justify-between h-16 items-center pr-10">
        <div className="flex items-center gap-[0.5px]">
          <div className="flex gap-1 ">
            <div className="w-[15px] h-[50px] rounded-lg bg-red-400 transform rotate-[35deg]"></div>
            <div className="w-[15px] h-[50px] rounded-lg bg-yellow-400 transform rotate-[35deg]"></div>
            <div className="w-[20px] h-[20px] rounded-full bg-green-400 mt-[25px] ml-[-5px]"></div>
            <div className="ml-2 flex gap-2 mt-5">
              <h1 className="font-semibold">
                EUT
                <span className="font-normal text-green-500">SOL</span>
              </h1>
              <h1 className="opacity-40">Distribution Management</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            {/* icons  */}
            <span className=" text-gray-400">
              <BsThreeDots className="w-[20px] h-[20px] lgdesktop:w-[30px] lgdesktop:h-[30px]" />
            </span>
            <span className=" text-gray-400">
              <BiMessageSquareAdd className="w-[20px] h-[20px] lgdesktop:w-[30px] lgdesktop:h-[30px]" />
            </span>
            <span className=" text-gray-400 relative">
              <MdOutlineNotificationsActive className="w-[20px] h-[20px] lgdesktop:w-[30px] lgdesktop:h-[30px]" />
              <span className="text-[8px] lgdesktop:text-[12px] absolute top-0 right-0 text-white bg-red-500 lgdesktop:w-[15px] lgdesktop:h-[15px] w-[10px] h-[10px] flex items-center justify-center rounded-full">
                2
              </span>
            </span>
          </div>
          {/* user avatar  */}
          <div className="md:flex items-center  hidden gap-8">
            <SelectCountry />

            <div className="rounded-full lgdesktop:w-[40px] lgdesktop:h-[40px]   w-[30px] h-[30px] bg-red-400 text-white flex items-center justify-center">
              T
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
