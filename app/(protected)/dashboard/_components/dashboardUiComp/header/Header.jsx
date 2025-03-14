import Image from "next/image";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiMessageSquareAdd } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import logo from "../../../../../../public/logo.svg";
import Navbar from "../../dashboardUiComp/pagesNavbar/Navbar";

const Header = () => {
  return (
    <div className="flex flex-col gap-1 pl-10 pr-5">
      <div className="flex justify-between h-16 items-center pr-10">
        <div className=" flex items-center gap-[0.5px]">
          <Image src={logo} alt="logo" width={130} height={120} />
          <span className=" text-sm tracking-wide  text-gray-400 font-light">
            Distribution Management
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            {/* icons  */}
            <span className=" text-gray-400">
              <BsThreeDots className="w-[20px] h-[20px]" />
            </span>
            <span className=" text-gray-400">
              <BiMessageSquareAdd className="w-[20px] h-[20px]" />
            </span>
            <span className=" text-gray-400 relative">
              <MdOutlineNotificationsActive className="w-[20px] h-[20px]" />
              <span className="text-[8px] absolute top-0 right-0 text-white bg-red-500 w-[10px] h-[10px] flex items-center justify-center rounded-full">
                2
              </span>
            </span>
          </div>
          {/* user avatar  */}
          <div className="md:flex items-center hidden gap-8">
            <select id="countries" className=" focus:outline-none">
              <option selected>Canada</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>

            <Image
              src={""}
              alt="user-avatar"
              width={30}
              height={30}
              className=" rounded-full  border border-black"
            />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
