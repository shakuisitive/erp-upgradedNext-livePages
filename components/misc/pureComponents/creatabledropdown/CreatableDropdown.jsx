
import React ,{useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {getFocused} from "../../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice"
import { useSelector, useDispatch } from "react-redux";


const CreatableDropdown = ({value , handleCreateOption , slectedOption , title , bot = false}) => {
  // console.log('check title' , title);

  

  const dispatch = useDispatch()


  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: 'none', // hide the dropdown indicator (arrow)
    }),
    control:(provided,state)=>(
      {
        height:"26px",
        // width:"250px",
        // borderColor:"transparent",
       borderColor:state.isFocused?"#0073ea !important":"",
       boxShadow:state.isFocused?"none":provided.boxShadow,
       ":hover":{
                borderColor:"lightGray",
                cursor:"text",
                // backgroundColor:"inherit"
                backgroundColor:"transparent"
       }

      }
    ), 
    option: (provided, state) => ({
      
      ':hover': {
        backgroundColor: '#1F76C2', // Hover styling
        color:"white"
      }
    }

    ),
    menu:(provided,state)=>({
      ...provided,
      boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
      backgroundColor:"#f3f4f6"
    })
  };

  const customFilter = (option,inputValue) => {
    // Perform case-insensitive search
    const lowerCaseInput = inputValue.toLowerCase();
    const lowerCaseLabel = option.label.toLowerCase();
    if(inputValue.length==0){
      return false;
    }
    return lowerCaseLabel.includes(lowerCaseInput);
  };

  return (
    <CreatableSelect
      

      // classNames={{
      //   control: ({isFocused}) => (`group-hover:border  text-[15px] font-normal text-gray-200 border-gray-300 px-[6px] rounded-[4px] ${isFocused?" outline-none !bg-white":""} flex items-center`),
      //   container:()=>"w-full",
      //   indicatorSeparator:()=>"hidden",
      //   dropdownIndicator:()=>"hidden",
      //   option:({isHovered,isSelected})=>`${isSelected?"bg-sky-500 text-white":""} p-[0.5vw]`
      // }}

      classNames={{
        control: ({isFocused}) => (`hover:border text-[15px] font-normal text-gray-200 border-gray-300 px-[6px] rounded-[4px] ${isFocused?" outline-none !bg-white":""} flex items-center`),
        container:()=>"w-full",
        indicatorSeparator:()=>"hidden",
        dropdownIndicator:()=>"hidden",
        option:({isHovered,isSelected})=>`${isSelected?"bg-sky-500 text-white":""} p-[0.5vw]`,
        menu:()=>"border-[1px] border-gray-500 "
      }}
      options={value}
      menuPlacement={bot == false ?'top' : "bottom"}
      isDisabled={true}
      styles={customStyles}
      isClearable
      isSearchable
      placeholder="+ Add Purchase"
      onCreateOption={handleCreateOption}
      onChange={slectedOption}
      onFocus={()=>dispatch(getFocused({title:title , focus:true}))}
      onBlur={()=>dispatch(getFocused({title:title , focus:false}))}
      filterOption={customFilter}
    />
  );
};

export default CreatableDropdown;


//method to use

//   const [options,setOptions]= useState([
//   { value: 'Nutraunex', label: 'Nutraunex' },
//   { value: 'Supplier', label: 'Supplier' },
//   { value: 'Getz', label: 'Getz' },
// ])

// const handleCreateOption=(inputValue)=> {
//         const newOption = {
//             value: inputValue,
//             label: inputValue,
//         }
//         setOptions([...options,newOption])
// }

//             <CreatableDropdown value={options} handleCreateOption={handleCreateOption}/>

