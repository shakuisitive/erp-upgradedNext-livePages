"use client"
import React , {useState} from 'react'
import { useDispatch } from 'react-redux';
import { openForm } from "../../redux/Purchase.slice";

const PurchaseMGridStatus = ({data , index , rowData}) => {

  const [isOpen, setIsOpen] = useState(false);


  const dispatch = useDispatch()
  const togglePopover = () => {

    if(data == 'Initiated' || data == 'Issued to Vendor'){
      setIsOpen(!isOpen);

    }
   
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);
    dispatch(openForm(rowData));
    setIsOpen(false);
  };
  
  // // console.log('custom comp data' , index , rowData);
  return (
    <div className='size-full relative'>
    <div onClick={togglePopover}  className={`w-full h-full flex items-center cursor-pointer justify-center ${data == "Completed" ? "bg-green-400" :data == "Issued to Vendor" ?  "bg-cyan-400" : data == "Initiated" ?  "bg-zinc-400" :data == "Void" ? "bg-yellow-400":data == "Ready for Receiving" ? "bg-indigo-500" : data == 'Partially Ready for Receiving' ? "bg-slate-400" : data == 'Partially Received' ? "bg-slate-400" : ""} `}>
        
        <p className='text-[14px] leading-normal  line-clamp-1 text-white'>{data}</p>

        </div>

        {isOpen && (
        <div className=" absolute -left-[60px]  mt-2 w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
          <div className="p-4">
          <div onClick={handleOpenModal} className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-cyan-400 ${data == "Initiated" ? "flex" : "hidden"} justify-center items-center`}>Issued to Vendor</div>
         

          <div onClick={handleOpenModal} className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-indigo-500 ${data == "Issued to Vendor" ? "flex" : "hidden"} justify-center items-center`}>Ready for Receiving</div>
          </div>
          
        </div>
      )}
        </div>
  )
}

export default PurchaseMGridStatus