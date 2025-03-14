import React,{useState} from 'react'
import { pushCheckedItems,unPushCheckItems } from '../redux/stockSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const CheckBox = (props) => {
    const dispatch = useDispatch();
    const checkedItems = useSelector(state=>state.stockSlices.checkedItems);
   
    const isChecked = checkedItems.some(item=>item.SKU_MANUFACTURE===props.rowData.SKU_MANUFACTURE)
    

    const checkBoxChangeHandler = e =>{
                if(e.target.checked){
                    dispatch(pushCheckedItems({...props.rowData}));
                }else{
                    dispatch(unPushCheckItems(props.rowData.SKU_MANUFACTURE));
                }
    }
  return (
    <div className='w-full'><input checked={isChecked} id={props.rowData.SKU_MANUFACTURE} type="checkbox" onChange={checkBoxChangeHandler}/></div>
  )
}

export default CheckBox