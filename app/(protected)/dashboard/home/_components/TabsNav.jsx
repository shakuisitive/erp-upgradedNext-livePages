"use client";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import React from "react";
import { PiPlugLight } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import gmailLogo from "../gmailLogo.png"
import adobeLogo from "../adobeLogo.png"
import facebookLogo from "../facebookAd.png"
// const handleTabClick = (index) => {
//   setActiveNavTab(index);
// };

function TabsNav() {
  // const [activeNavTab, setActiveNavTab] = useState(1);
  const [showNav, setShowNav] = useState(true);
  const [buttonDownAnim,setButtonAnim] = useState(false);
  const [buttonDownAnimT,setButtonAnimT] = useState(false);
  const [currTab,setCurrTab] = useState("main-tab");
  
 function buttonDownAnimAddHandler(name){
  //  alert("add called")
    name=="button1"?setButtonAnim(true):setButtonAnimT(true)

  }
 function buttonDownAnimRemoveHandler(name){
  // alert("remove called")
   name=="button1"?setButtonAnim(false):setButtonAnimT(false)
  }

  function currTabHandler(tab){
   setCurrTab(tab);
  }
  return (
    <div className="w-full mx-auto  border-b-[1px] border-gray-300 text-[14px] text-customblack font-normal">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 ">
          <div className={`${currTab=="main-tab"?"border-b-[#0073ea] border-b-[2px]":""}  pb-[0.8px] mt-[1px]`}>
            <button
              className={`flex items-center text-[14px] w-[100px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-[#dcdfec] 
               after:absolute after:right-[0px]`}
              onClick={() => currTabHandler("main-tab")}
            >
              <GoHome /> Main Tab
            </button>
          </div>
          <div className={`${currTab=="table"?"border-b-[#0073ea] border-b-[2px]":""} pb-1 mt-[1px]`}>
          <button
            className={`flex items-center text-[14px] relative p-[8px] text-gray-600 h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-[#dcdfec] 
               after:absolute after:right-[0px]`}
            onClick={() => currTabHandler("table")}
          >
           Table
          </button>
        </div>
        </div>
        {/* 2nd  */}
        <div className="flex items-center gap-2">
          <div onMouseDown={()=>buttonDownAnimAddHandler("button1")} onMouseUp={()=>buttonDownAnimRemoveHandler("button1")} className="h-[30px] w-[200px] flex justify-center items-center">
          <div  className={`${buttonDownAnim?"w-[180px]":""} h-full w-full transition-all ease-in-out duration-75  flex items-center gap-2 px-2 hover:bg-[#dcdfec] cursor-pointer rounded-[4px]`}>

            <PiPlugLight className="-rotate-90 text-xl" /> <p>Integrate</p>
            <div className="flex">
            <div className=" relative">
            <div class="hexagon disabled w-full h-full absolute  ">
            </div>
            <img
                  class={`w-[30px] p-[5px]`}
                src={gmailLogo.src}
              />
            </div>
            <div className=" relative">
            <div class="hexagon disabled w-full h-full absolute ">
            </div>
            <img
                class="w-[30px] p-[5px]"
                src={facebookLogo.src}
              />
            </div>
            <div className=" relative">
            <div class="hexagon disabled w-full h-full absolute  ">
            </div>
            <img
                class="w-[30px] p-[5px]"
                src={adobeLogo.src}
              />
            </div>
            
            </div>
          </div>
          </div>
          <div onMouseDown={buttonDownAnimAddHandler} onMouseUp={buttonDownAnimRemoveHandler} className="h-[30px] w-[130px] flex justify-center items-center">
          <div className={`${buttonDownAnimT?"w-[110px]":""} w-full h-full flex transition-all ease-in-out duration-75 items-center px-4 gap-2 py-1 hover:bg-[#dcdfec] cursor-pointer rounded-[4px]`}>
            <RiRobot2Line className="text-[14px]" /> <p>Automate</p>
          </div>
          </div>
          <div
            className="rounded-full p-1 cursor-pointer border text-customblack border-grayBlack"
            onClick={() => setShowNav(!showNav)}
          >
            <IoIosArrowDown className={`${showNav ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
      {/* <hr className="w-[100%] bg-gray-300  h-[2px]" /> */}
    </div>
  );
}

export default TabsNav;

// "use client";
// import { useState } from "react";
// import { GoHome } from "react-icons/go";
// import React from "react";
// import { PiPlugLight } from "react-icons/pi";
// import { RiRobot2Line } from "react-icons/ri";
// import { IoIosArrowDown } from "react-icons/io";


// // const handleTabClick = (index) => {
// //   setActiveNavTab(index);
// // };

// function TabsNav() {
//     // const [activeNavTab, setActiveNavTab] = useState(1);
// const [showNav, setShowNav] = useState(true);
//   return (
//     <div className="w-full mx-auto p-2">
//       <div className="flex items-center justify-between">
//         <div >
//           <button
//             className={`flex items-center gap-2 rounded-sm hover:bg-gray-200 
//               border-b-2  pb-2 px-2 py-2 border-[#007f9b]`}
//             // onClick={() => handleTabClick()}
//           >
//             <GoHome /> Main Tab
//           </button>
//         </div>
//         {/* 2nd  */}
//         <div className="flex items-center gap-2">
//           <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#DBDEEB] cursor-pointer rounded-lg">
//             <PiPlugLight className="-rotate-90 text-xl" /> <p>Integrate</p>
//           </div>
//           <div className="flex items-center px-4 gap-2 py-2 hover:bg-[#DBDEEB] cursor-pointer rounded-lg">
//             <RiRobot2Line className="text-xl" /> <p>Automate / 10</p>
//           </div>
//           <div className="rounded-full p-1 cursor-pointer border border-black"
//           onClick={()=>setShowNav(!showNav)}
//           >
//           <IoIosArrowDown className={`${showNav?"rotate-180":''}`} />
//           </div>
//         </div>
//       </div>
//       <hr className="w-[100%] h-[100%] border border-gray-300" />
//     </div>
//   );
// }

// export default TabsNav;
