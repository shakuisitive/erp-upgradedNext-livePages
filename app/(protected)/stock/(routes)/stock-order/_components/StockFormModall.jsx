"use client"

import React , {useState} from 'react'
import {  useDispatch } from "react-redux";
import {openDrawr} from "../redux/stockSlice"

import { BiMessageRoundedAdd } from 'react-icons/bi';
const StockFormModall = ({index}) => {
  const [open , setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpenDrawr = ()=>{
if(open == false){
  setOpen(true)
  dispatch(openDrawr(true))
}else if(open == true){
  setOpen(false)
  dispatch(openDrawr(false))
}
  }
  return (
    <div>
        <BiMessageRoundedAdd onClick={handleOpenDrawr}  className='text-[25px] text-gray-500' />
       

        </div>
  )
}

export default StockFormModall