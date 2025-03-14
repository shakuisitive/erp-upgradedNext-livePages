import React,{useState} from 'react'
import { pushCheckedItems,unPushCheckItems } from '../redux/stockSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const CheckBoxTopModal = (props) => {
    const dispatch = useDispatch();
    const checkedItems = useSelector(state=>state.stockSlices.checkedItemsTopModal);
    console.log(checkedItems)
   
    const isChecked = checkedItems.some(item=>item.SKU_MANUFACTURE===props.rowData.SKU_MANUFACTURE)
    

    const checkBoxChangeHandler = e =>{
                if(e.target.checked){
                    dispatch(pushCheckedItems({data:{...props.rowData},array:"checkedItemsTopModal"}));
                }else{
                    dispatch(unPushCheckItems({data:props.rowData.SKU_MANUFACTURE,array:"checkedItemsTopModal"}));
                }
    }
  return (
    <div className='w-full'><input checked={isChecked} id={props.rowData.SKU_MANUFACTURE} type="checkbox" onChange={checkBoxChangeHandler}/></div>
  )
}

export default CheckBoxTopModal