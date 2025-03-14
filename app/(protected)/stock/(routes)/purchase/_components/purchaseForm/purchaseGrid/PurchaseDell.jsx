'use client'
import React , {useState , useRef} from 'react'
import { MdCallSplit , MdDelete } from 'react-icons/md'
import SkuModall from './SkuModall'
import {openSplitModall ,  subGridDelete} from '../../../redux/Purchase.slice'
import { useSelector, useDispatch } from "react-redux";
const PurchaseDell = ({data , index , rowData}) => {
    const dispatch = useDispatch()
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);

  return (
    <div  disabled={ FormStatus == "Initiated" ? false : true} className=' w-full flex items-center justify-center '>
    <MdDelete onClick={()=>dispatch( subGridDelete(index))}  className={`text-red-500  text-[25px]`} />
   
     </div>
  )
}

export default PurchaseDell