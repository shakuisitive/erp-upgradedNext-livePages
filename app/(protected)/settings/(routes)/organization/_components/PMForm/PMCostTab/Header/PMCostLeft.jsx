import React from 'react'
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect"
import InputHook from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook"
const PMCostLeft = () => {
  return (
   
    <div className=" bg-blackflex gap-10 sm:w-full flex-col sm:h-full items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3 ">
                    <div className="grid grid-cols-[190px_auto] mb-[12px] mb-4 p-4">
       {/* <div className="bg-gree-500 grid grid-cols-[190px_auto] mb-[12px] mt-4 "> */}
    
  {/* <div className=" grid grid-cols-2 justify-item:center gap-4 mb-4 w-[40%] bg-yellow-400">
    <div className="text-center flex ">Current</div>
  </div>
  <div className="flex justify-center items-center px-8 py-4 bg-green-400">
    <div className="text-center">Projected</div>
  </div>
  </div> */}

{/* <div className="bg-blue-600 grid grid-cols-[190px_auto] mb-[12px] "> */}
  <label className=" font-[500] text-[14px]" htmlFor="code"></label>
  <div className="flex justify-between w-[100%]">
   
    <div className='w-[75%]'>
    <label className="p-[90px] font-[500] text-[14px] text-black font-bold" htmlFor="code">Current</label>
    </div>

    <div className='w-[25%]'>
    <label className="p-[8px] font-[500] text-[14px] flex text-black font-bold" htmlFor="code">Projected</label>
    </div>

  </div>
  </div>
  {/* </div> */}


<div className="grid grid-cols-[190px_auto] mb-[12px]">
  <label className=" font-[500] text-[14px]" htmlFor="code">Landed Cost</label>
  
  <div className="flex justify-between w-[100%]">
    {/* <div className=' flex w-[60%] '> */}
    <div className='w-[40%]'>
     
      < InputHook
        type="text"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-6 py-6 shadow-sm outline-none text-[12px] "
        placeholder="RO from Cost"
      />
    {/* </div> */}
    </div>
    <div className='w-[40%]'>
    
      < InputHook
        type="text"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-6 py-6 shadow-sm outline-none text-[12px] "
        placeholder="RO from Cost"
      />
    
    </div>
  </div>
</div>
                  <div className="grid grid-cols-[190px_auto] mb-[12px]">
                    <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Profit Margin</label>
                      <div className="flex justify-between  w-[100%]">
                        <div className='w-[40%]'>
                          < InputHook
                            type="text"
                            name="mfg-part"
                            className="max-w-[250px] w-[100%] bg-white px-6 py-6 shadow-sm outline-none text-[12px] "
                            placeholder="00.00 %"
                          />
                        </div>
                        <div className='w-[40%]'>
                          < InputHook
                            type="text"
                            name="mfg-part"
                            className="max-w-[250px] w-[100%] bg-white px-3 py-3 shadow-sm outline-none text-[12px] "
                            placeholder="00.00 %"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-[190px_auto] mb-[12px]">
  <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">List Cost</label>
  <div className="flex justify-between  w-[100%]">
    <div className='w-[40%]'>
      < InputHook
        type="text"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-3 py-3 shadow-sm outline-none text-[12px] "
        placeholder="00.00"
      />
    </div>
    <div className='w-[40%]'>
      < InputHook
        type="text"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-3 py-3 shadow-sm outline-none text-[12px] "
        placeholder="00.00"
      />
    </div>
  </div>
</div>
<div className="grid grid-cols-[190px_auto] mb-[12px]">
  <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Effective Date</label>
  <div className="flex justify-between w-[100%]">
    <div className='w-[40%]'>
      < InputHook
        type="date"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-3 py-3 shadow-sm outline-none text-[12px] "
       
    />
      
    </div>
    <div className='w-[40%]'>
      < InputHook
        type="date"
        name="mfg-part"
        className="max-w-[250px] w-[100%] bg-white px-3 py-3 shadow-sm outline-none text-[12px] "
      
      />
    </div>
    
  </div>
</div>
                 
                  {/* porjected start */}
                  {/* <div className='w-[40%]'>
      */}
            {/* </div>     */}
            {/* </div> */}
            </div>
         
                


  )
}

export default PMCostLeft;