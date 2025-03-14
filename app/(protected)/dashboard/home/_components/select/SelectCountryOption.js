import React from "react";
const SelectCountryOption = (props) => {
  function setSelectedCountry() {
   props.setSelectedCountry({country:props.country,flag:props.flag})
  }
  return (
    <li className="flex 2xl:h-[40px] xl:h-[35px] lg:h-[30px] md:h-[25px] items-center xl:gap-[6px] lg:gap-[4px] md:gap-[2px] 2xl:gap-2 hover:rounded-none border hover:p-[6px]  p-[5px]" onClick={setSelectedCountry}>
      <img src={props.flag} className="w-[30px] h-[96%] object-cover xl:w-[26px] lg:w-[24px] md:w-[20px]" alt={props.country} />
      <span className="block capitalize 2xl:text-[16px] xl:text-[14px] lg:text-[12px] md:text-[10px]">{props.country}</span>
    </li>
  );
};

export default SelectCountryOption;
