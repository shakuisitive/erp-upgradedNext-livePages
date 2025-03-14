import React , {useState , useEffect} from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import {  useSelector , useDispatch} from 'react-redux'
// import { setFToT } from '../../redux/Purchase.slice'


const ReceivingGridPagination = () => {
  const dispatch = useDispatch()
  const colaps = useSelector((state) => state.receivingSlices.colaps);
  const [num , setNum] = useState(1)
  const [numT , setNumT] = useState(25)

 
  return (
    <div className={`flex text-[14px] text-customblack   my-1 ${colaps == true ? "" : "pl-5" } `}>
      <span className={`${colaps == true ? "hidden" : "block" }`}>{num}-{numT} of - </span>  <span className={`${colaps == true ? " text-[16px] tracking-widest   w-full " : "" }`}> 8,999</span>  
        <div className={` ${colaps == true ? "hidden" : "flex" } justify-between w-[50px] ml-3 items-center text-[18px] `}> 
        <div  className='cursor-pointer'>
        <IoIosArrowBack />
          
        </div>
            <div  className='cursor-pointer'>
            <IoIosArrowForward />

            </div>
        </div>
    </div>
  )
}

export default ReceivingGridPagination






