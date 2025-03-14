import React, { useState } from 'react'

const ReceivingStatus = ({data}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {

    if(data == 'NEW' ){
      setIsOpen(!isOpen);

    }
   
  };

  
  const handleOpenModal = () => {
    
    setIsOpen(false);
  };
  return (
    <div className='size-full relative'>
    <div onClick={togglePopover} className={`w-full h-full flex items-center justify-center ${data == "IN PROCESS" ? "bg-green-400" :data == "NEW" ?  "bg-cyan-400" : data == "NEW" ?  "bg-zinc-400" :data == "Void" ? "bg-yellow-400":data == "RE-STOCKED" ? "bg-indigo-400" :data == "Reversed" ? "bg-slate-400":data == "READY FOR RELEASE" ?
    "bg-teal-400":""} `}>
        <p className='text-[14px] text-white'>{data}</p>

        {isOpen && (
        <div className=" absolute -left-[60px]  mt-[100px] w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
          <div className="p-4">
          <div onClick={handleOpenModal} className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-indigo-400 ${data == "NEW" ? "flex" : "hidden"} justify-center items-center`}>RE-STOCKED</div>

          {/* <div onClick={handleOpenModal} className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-indigo-500 ${data == "Issued to Vendor" ? "flex" : "hidden"} justify-center items-center`}>READY FOR RELEASE</div> */}
          </div>
          
        </div>
      )}
        </div>
        </div>
  )
}

export default ReceivingStatus