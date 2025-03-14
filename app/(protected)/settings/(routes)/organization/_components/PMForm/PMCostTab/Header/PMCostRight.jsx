import React from 'react'
import  InputHook from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook"
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect"
import { FaAngleDown } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
const PMCostRight = () => {

//    const options = [
//     { value: 'options1', label : 'history'}
// ]
  return (
    <div>
       <div className="gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen p-8">
                    <div className="grid grid-cols-[190px_auto] mb-[12px] mt-4">
                        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">Last Price</label>
                       
                        <select type="text" id="code" className="bg-white focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px] "
                        
                         >
                                 <option className='text-right border-1'>history</option>   
                                                              
                                 </select>
                                
                                

                    </div>
                    <div className="flex items-center mt-4 ">
                        <div className="flex items-center">
                            <label className="min-w-[190px] p-[8px] font-[500] text-[14px]" htmlFor="code">Average Price </label>
                            <InputHook type="text" id="code" className="w-[100%] bg-white focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]" 
                              placeholder=" CALC RO"/>
                        </div>
                        <div className="grid grid-cols-[190px_auto] mb-[12px]">
                        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">Std Price</label>
                        <InputHook type="text" id="code" className="bg-white focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]"  placeholder="CALC RO" />
                    </div>
                    </div>
                    
                    <div className="grid grid-cols-[190px_auto] mb-[12px] relative">
                        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">GL Group</label>
                        <UseSelect type="text" id="code" className="bg-white text-[14px] focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]" >Slect

                            {/* <option>GLOBAL</option> */}
                        </UseSelect>
                        {/* <div className="absolute top-1/2 right-[18px] -translate-y-1/2 flex items-center justify-center gap-2 border-l py-[4px] px-[12px]">
                            <FaAngleDown className="text-gray-400" />
                            <FaPencil className="text-green-300" />
                        </div> */}
                    </div>
                    <div className="grid grid-cols-[190px_auto] mb-[12px] relative">
                        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">GLA/C#</label>
                        <UseSelect type="text" id="code" className="bg-white text-[14px] focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]" >
                           
                        </UseSelect>
                        {/* <div className="absolute top-1/2 right-[18px] -translate-y-1/2 flex items-center justify-center gap-2 border-l py-[4px] px-[12px]">
                            <FaAngleDown className="text-gray-400" />
                            <FaPencil className="text-green-300" />
                        </div> */}
                    </div>
                    <div className="grid grid-cols-[190px_auto] mb-[12px]">
                        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Notes</label>
                        <textarea id="code" className="bg-white focus:outline-none focus:unset h-[100px] border-b py-[8px] pl-[12px] pr-[36px]" />
                    </div>
                   
                  
                    </div>
                    
                    </div>
                

    
   
  )
}

export default PMCostRight
