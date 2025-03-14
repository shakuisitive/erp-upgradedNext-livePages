'use client'
import React,{useState} from "react";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import {
  IoIosSearch,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
// import PurchaseGrid from '../purchaseForm/purchaseGrid/PurchaseGrid'
import PurchaseGrid from './_components/purchaseForm/purchaseGrid/PurchaseGrid'
// import HeaderDropDown from "../purchaseForm/header/FormHeaderDropdown";
import HeaderDropDown from "./_components/purchaseForm/header/FormHeaderDropdown"
// import InputTextEut from "../../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import InputTextEut from "../../../../../components/misc/pureComponents/textinput/InputTextEut";
// import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import GridTable from "../../../../../components/misc/pureComponents/GridTable/GridTable"
// import CreatableDropdown from'../../../../../../../components/misc/pureComponents/creatabledropdown/CreatableDropdown';
import CreatableDropdown from "../../../../../components/misc/pureComponents/creatabledropdown/CreatableDropdown";
const PurchaseDrawer = ({ suplier, btnText }) => {
  const [colaps, setColaps] = useState(false);
//   const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ]; 
// const [selectedOption, setSelectedOption] = useState(null);
// const [options,setOptions]= useState([
//   { value: 'Nutraunex', label: 'Nutraunex' },
//   { value: 'Supplier', label: 'Supplier' },
//   { value: 'Getz', label: 'Getz' },
// ])
//   const handleChange = (newValue) => {
//     setSelectedOption(newValue);
//     setOptions(newValue)
//     // console.log("new value option",newValue)
//   };

 
// const [head, setHead] = useState([
//     {
//       title: "PO #",
//       slector: "PO#",
//       Wid: 250,
//       filter: "textFilter",
//     //   Modal: ReceivingFormModal,
//     },
//     { title: " Date", slector: "", Wid: 150, date: true },
//     {
//       title: "Priority",
//       slector: "Priority",
//       Wid: 150,
//       Status: "",
//     },
//     { title: "Supplier", slector: "supplier", Wid: 150 },
//     { title: "PO Date", slector: "PO_DATE", Wid: 150, date: true },
//     { title: "Inventory", slector: "INVENTORY", Wid: 200 },
//     {
//       title: "Status",
//       slector: "RECEIVING_STATUS",
//       Wid: 150,
//       Status: "",
//     },
//     { title: "Comments", slector: "Comments", Wid: 200 },
//   ]);
 const [row, setRow] = useState([
    { Contact: "Po78234234", Priority: "High", orderDate: "Jan 10", compDate: "Jan 20", Vander: "Vandor 1", phone: '+1 325 478 5698', email: "Phonix@gamil.com", cost: "$250.00", status: "Working on it", comments: "Working on its", },
    { Contact: "Po78234234", Priority: "Medium", orderDate: "Jan 10", compDate: "Jan 20", Vander: "Vandor 1", phone: '+1 325 478 5698', email: "Phonix@gamil.com", cost: "$250.00", status: "Done", comments: "Working on its",},
    { Contact: "Po78234234", Priority: "Low", orderDate: "Jan 10", compDate: "Jan 20", Vander: "Vandor 1", phone: '+1 325 478 5698', email: "Phonix@gamil.com", cost: "$250.00", status: "issued", comments: "Working on its", },
])
// const colapsfunc = () => {
//     if (colaps ) {
//       setColaps(false);
//     //   setColapsComp(true);
//     } else {
//       setColaps(!colaps);
//     }
//   };
//   const [options,setOptions]= useState([
//   { value: 'Nutraunex', label: 'Nutraunex' },
//   { value: 'Supplier', label: 'Supplier' },
//   { value: 'Getz', label: 'Getz' },
// ])

const handleCreateOption=(inputValue)=> {
        const newOption = {
            value: inputValue,
            label: inputValue,
        }
        setOptions([...options,newOption])
}
  return (
    <>
    <div className="flex w-full justify-between bg-white mb-2 rounded-t-md">
      <div className="  flex   ">
        <button className="bg-cyan-700 rounded-md py-1 px-2 text-white text-sm">
          {" "}
          {btnText}
        </button>
        <div className="flex ml-4">
          <div className="bg-green-400 flex mr-2 p-[2px] h-full"></div>
            {/* <CreatableDropdown value={options} handleCreateOption={handleCreateOption}/> */}
        </div>
      </div>
      <div className=" lg:flex md:hidden sm:hidden hidden  justify-end ">
        <div className="flex ">
          <div className="flex gap-4">
            <div className="hedden lg:flex md:hidden sm:hidden items-center gap-2">
              {/* <IoIosSearch className="text-[18px]" />
              Search */}
            </div>
            <div className="hidden items-center gap-2 lg:flex md:hidden sm:hidden">
              {/* <BiSortAlt2 className="text-[18px]" />
              Sort */}
            </div>
          </div>
        </div>
         <div className="flex w-[17%]  min-w-fit justify-end gap-2">
        <div className="flex items-center">
          <div className="flex items-center gap-2 lg:hidden md:flex sm:flex mt-1">
            {/* <HeaderDropDown /> */}
          </div>
        </div>
        <div className="flex items-center p-1">
          <FiFilter className="text-[18px]" />
        </div>

        <div className="flex items-center p-1">
          {/* <IoSettingsOutline className="text-[18px]" /> */}
        </div>
      </div>
      </div>
     
    </div>
    <div className="flex gap-6 bg-gray-50 pt-3 pl-3 ">     
             {/* <InputTextEut placeHolder='Ref '/>
             <InputTextEut placeHolder='Comments '/> */}
        </div>
    <div className="">
        {/* <PurchaseGrid/> */}
        {/* <GridTable
        //  head={head}
             row={row}
            // setHead={setHead}
            // colaps={colaps}
            // setColaps={setColaps}
            // colapsfunc={colapsfunc}
            /> */}
    </div>
    </>
    
    
  );
};

export default PurchaseDrawer;
