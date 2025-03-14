import React , {useState , useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh,closeModallForm} from '../redux/supplierSlice'
import useApiFetch from '../../../../../../customHook/useApiFetch'
import useKeyPress from '../../../../../../customHook/useKeyPress'
// import VoidNotes from './VoidNotes'
import { IoIosArrowDown } from 'react-icons/io';


const ModalButtonTooltip = () => {
    let forPayload = useSelector(state => state.supplier.formPayload);
    let objectMatched=useSelector(state => state.supplier.isObjectEqual);
    let refresh=useSelector(state => state.supplier.Refresh);
    console.log(forPayload)
    const dispatch=useDispatch();

    const [error,sendRequest]=useApiFetch()
    console.log(error)
    const url=`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/PostPaymentTerm`;
    const accessToken =localStorage.getItem("tokenSession");
    const getAllTask=(data)=>{
            console.log(data)
    }
    useEffect(()=>{
       
    },[]);
    
    const handleClick=()=>{
        sendRequest(url,"POST",forPayload,getAllTask,accessToken);
        dispatch(closeModallForm());
        dispatch(setRefresh(!refresh))

    }


  return (
    <div className='size-full relative'>
    <button onClick={handleClick} disabled={objectMatched} className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md ${objectMatched==true?"bg-gray-100 text-black cursor-not-allowed":" bg-customgreen hover:bg-btnHoverGreen"}`}>

<div  className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md`}>
           <div  className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
            
            <span className="font-medium ">Apply</span>
           </div>
           <div className="text-white flex items-center px-2 ">
            <IoIosArrowDown className="text-[18px] "/>
           </div>
        </div>
    </button>
        </div>
  )
}

export default ModalButtonTooltip
