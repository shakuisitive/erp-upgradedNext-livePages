import React from 'react'
import { MdCallSplit } from 'react-icons/md'
import {setNewsplit} from '../../../redux/Purchase.slice'
import { useSelector, useDispatch } from "react-redux";
import { CgAddR } from 'react-icons/cg';
import { FaRegSquarePlus } from 'react-icons/fa6';


const splitPurchaseSplit = ({ data, rowData, index }) => {
  console.log('rowdatat split', rowData)
  const availableQuantity = useSelector(
    (state) => state.PurchaseSlices.availableQuantity
  );

    const dispatch = useDispatch()

    const addSplit =() =>{
      const  dataa={
            par_id : rowData.PAR_ID,
            puorder : rowData.PURORD_ID,
            purID: rowData.PURORDDET_ID,
            cost: rowData.COST
             
        }

        if(availableQuantity != 0) {
          dispatch(setNewsplit(dataa))
        }else {
          alert('no available quantity')
        }


    }
    // console.log('split row data' , rowData);
  return (
    <div className=' w-full flex items-center justify-center '>
    <FaRegSquarePlus onClick={addSplit}  className='text-grayBlack text-[25px] hover:text-[#579BFC]' />
  
     </div>
  )
}

export default splitPurchaseSplit