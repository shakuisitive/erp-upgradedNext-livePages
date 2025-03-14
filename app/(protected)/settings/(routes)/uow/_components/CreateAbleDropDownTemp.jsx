
import {useState} from 'react';
import CreatableSelect from 'react-select/creatable';

const CreatAbleDropdown = ({value , handleCreateOption , slectedOption}) => {

  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      display: 'none', // hide the dropdown indicator (arrow)
    }),
    control:(provided,state)=>(
      {
        height:"32px",
       boxShadow:state.isFocused?"none":provided.boxShadow,
       ":hover":{
                borderColor:"lightGray"
       }

      }
    ), 
    option: (provided, state) => ({
      
      ':hover': {
        backgroundColor: 'lightGray', // Hover styling
      }
    }

    ),
  };
  return (
    <CreatableSelect
      // className="w-full z-50  min-w-[200px] bg-white border-b border-b-gray-300 text-[14px] outline-none "
      classNames={{
        control: ({isFocused}) => (`hover:border hover:border-gray-300 rounded-md ${isFocused?"bg-gray-100 border-gray-300 outline-none":""} flex items-center`),
        container:()=>"w-full",
        indicatorSeparator:()=>"hidden",
        dropdownIndicator:()=>"hidden",
        option:({isHovered,isSelected})=>`${isSelected?"bg-blue-300 text-white":""} p-[0.5vw]`
      }}
      options={value}
      menuPlacement='top'
      // styles={{
      //   control: (provided, state) => ({
      //     ...provided,
      //     borderBottom: state.isFocused ? '1px solid #007bff' : '1px solid #ccc', // Bottom border color
      //     borderRadius: 0,
      //     border:'none',
      //     boxShadow: 'none',
         
      //   }),
      // }}
      styles={customStyles}
      isClearable
      isSearchable
      placeholder="Add purchase"
      onCreateOption={handleCreateOption}
      onChange={slectedOption}
    />
  );
};

export default CreatAbleDropdown;


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

