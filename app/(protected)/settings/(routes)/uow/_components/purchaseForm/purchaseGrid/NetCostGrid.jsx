import React from 'react'
import {setDiscount} from '../../../redux/Purchase.slice'
import { useDispatch } from 'react-redux'
const NetCostGrid = ({data , rowData , index}) => {
    const dispatch = useDispatch()
// console.log('check rowData in % Net' , rowData);

   const  setChange = (e) =>{
// const Per = (e.target.value * rowData.COST) /100
// const dataDis = {
//     cat:'net',
//     data:e.target.value,
//     indexR:index
// }
// dispatch(setDiscount(dataDis))

   }
  return (
    <div className='flex justify-center items-center bg-[#E1EFF2] px-[3px] w-full text-[14px] text-customblack'>
    {

    }
      {/* <input  className='w-[50px] outline-none ' value={data ? data : 0.00} type="number" /> */}
      <input onChange={setChange} className='w-full text-center outline-none py-[3px]' value={data ? data : 0.00} type="number" />
    </div>
  )
}

export default NetCostGrid