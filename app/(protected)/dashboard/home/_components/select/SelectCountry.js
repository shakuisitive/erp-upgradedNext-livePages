"use client"
import React, { useState,useEffect,useRef } from "react";
import {MdKeyboardArrowDown as KeyboardArrowDown,MdKeyboardArrowUp as KeyboardArrowUp } from "react-icons/md";
import SelectCountryOption from "./SelectCountryOption";

const selectCountryOptionsData = [
  { country: "Canada", flag: "/media/dashboard/canadaFlag.png" },
  { country: "Pakistan", flag: "/media/dashboard/pakFlag.png" },
  { country: "Russia", flag: "/media/dashboard/russiaFlag.png" },
];
const SelectCountry = () => {
  // const selectedCountry = useSelector((state) => state.selectedCountry);
  const [selectCountryToggle, setSelectCountryToggle] = useState(false);
  const [selectedCountry,setSelectedCountry] = useState(selectCountryOptionsData[0]);
  const [selectCountryInput,setSelectCountryInput] = useState(selectCountryOptionsData[0].country);
  const [selectCountryFilteredOptions,setSelectCountryFilteredOptions] = useState([...selectCountryOptionsData]);
 const inpuptRef = useRef(null);
 const selectCountryRef = useRef(null);


  const selectCountryToggleHandler = () => {
    console.log("i am called")
    setSelectCountryToggle((pre) => !pre);
  };


useEffect(()=>{
setSelectCountryInput(selectedCountry.country);
},[selectedCountry]);

useEffect(()=>{
  if(selectCountryInput){
    const filteredOptions = selectCountryOptionsData.filter(option=>{
      return option.country.toLocaleLowerCase().trim().includes(selectCountryInput.toLowerCase().trim());
    });
    setSelectCountryFilteredOptions(filteredOptions);
    
  }else{
    setSelectCountryFilteredOptions(selectCountryOptionsData);
  }
  
},[selectCountryInput])

const handleClickOutside = (event)=>{
  if (selectCountryRef.current && !selectCountryRef.current.contains(event.target)) {
    console.log("i am also called handle click outside")
    setSelectCountryToggle(false); // Close the dropdown
  }
}
useEffect(()=>{
  if(selectCountryToggle){
    inpuptRef.current.focus();
    document.addEventListener('click', handleClickOutside);
  }else{
    inpuptRef.current.blur();
    console.log("I am  called in else block of code")
    document.removeEventListener('click',handleClickOutside)
  }
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };

},[selectCountryToggle])




  return (
    <div
      ref={selectCountryRef}
      className="cursor-pointer  w-[13vw] relative   2xl:h-[40px] xl:h-[35px] lg:h-[30px] md:h-[25px]"
      onClick={selectCountryToggleHandler}
    >
      <div style={{border:selectCountryToggle?"1.8px solid black":"1.8px solid white"}} className="rounded-[4px] mb-[8px] flex items-center h-full w-full ">
        <div className="flex selectCountryOption p-[5px] gap-2 h-full w-full items-center">
          <img
            src={selectedCountry ? selectedCountry.flag : ""}
            className="2xl:w-[30px] h-[96%] object-cover xl:w-[26px] lg:w-[24px] md:w-[20px] "
            alt="canada flag"
          />
          <span className="block capitalize 2xl:text-[16px] xl:text-[14px] lg:text-[12px] md:text-[10px]">
            <input type="text" value={selectCountryInput} ref={inpuptRef} className="focus:outline-none h-full w-[70%]" onChange={(e)=>setSelectCountryInput(e.target.value)} />
            {/* {selectedCountry ? selectedCountry.country : ""} */}
          </span>
        </div>
        <div  className="">
        {selectCountryToggle ? (
          <KeyboardArrowUp className=" !text-[1.7vw]" />
        ) : (
          <KeyboardArrowDown className=" !text-[1.7vw]" />
        )}
        </div>
      </div>
      {selectCountryToggle && (
        <ul className="w-full shadow-md pb-0 bg-sky-700 absolute z-400">
          {selectCountryFilteredOptions.map((option) => {
            return (
              <SelectCountryOption
                country={option.country}
                flag={option.flag}
                setSelectedCountry={setSelectedCountry}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectCountry;
