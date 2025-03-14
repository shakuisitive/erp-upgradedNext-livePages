import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import {CiCalculator2, CiCalendarDate, CiSquareQuestion} from 'react-icons/ci'
import {LiaShippingFastSolid} from 'react-icons/lia'
import { AiOutlineDeliveredProcedure } from 'react-icons/ai'
import { PiInfoBold } from 'react-icons/pi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { useDispatch , useSelector } from 'react-redux'
import {onHeadVis} from "../../redux/Purchase.slice"

const VenderDetails = () => {
    const dispatch = useDispatch()
    
  return (
    <div className='cursor-pointer bg-gray-50 w-[800px] overflow-hidden flex rounded-lg text-customblack text-[14px] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] border border-gray-300 '>

        <div onClick={()=>dispatch(onHeadVis(false))} className='px-1 bg-[#0073EA] flex items-center justify-center cursor-pointer  '> <IoIosArrowBack className='text-white text-[20px]'/></div>
       <div className=' grow border-r pl-5 my-5 pr-0 border-r-gray-200 mr-5 '>
        <div className='flex py-2 hover:text-customblue'>
            <div className='w-2/4 flex '> <CiCalendarDate className=' w-[18px] h-[18px] text-[18px] mr-2'/> Requierd Date :</div>
            <div className='w-2/4 text-[16px]'>24-mar-2024 </div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex'> <LiaShippingFastSolid className=' w-[18px] h-[18px] text-[18px] mr-2'/>Ship To :</div>
            <div className='w-2/4'>Torronto</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex' > <CiSquareQuestion className=' w-[18px] h-[18px] text-[18px] mr-2'/>Requested by :</div>
            <div className='w-2/4' >Natural calm</div>
        </div>
        </div>

       

        <div className='grow border-r my-5 px-0 border-r-gray-200 mr-5'>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex'> <LiaShippingFastSolid className=' w-[18px] h-[18px] text-[18px] mr-2'/>Ship Via : </div>
            <div className='w-2/4'>TCS</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex'> <AiOutlineDeliveredProcedure className=' w-[18px] h-[18px] text-[18px] mr-2'/>Ship ins :</div>
            <div className='w-2/4 flex'>Sapliments</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex' ><PiInfoBold className=' w-[18px] h-[18px] text-[18px] mr-2'/>FOB : </div>
            <div className='w-2/4' >12355</div>
        </div>
        </div>

        <div className='grow  my-5 pr-0 '>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex  '><CiCalculator2 className=' w-[18px] h-[18px] text-[18px] mr-2'/>Terms :</div>
            <div className='w-2/4'>$ 1205.5</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4 flex '><IoDocumentTextOutline className=' w-[18px] h-[18px] text-[18px] mr-2'/>Curruncy :</div>
            <div className='w-2/4 text-[16px]'>$ 305.5</div>
        </div>
        <div className='flex py-2 '>
            <div className='w-2/4' >Tottal</div>
            <div className='w-2/4' >$ 1235.5</div>
        </div>
        </div>
        </div>
  )
}

export default VenderDetails