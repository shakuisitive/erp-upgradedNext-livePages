import React , {useState , useEffect , useRef} from 'react'
import CreatableDropdown from '../../CreateAbleDropDownTemp'
import { useSelector, useDispatch } from "react-redux";
import { setNewItem } from "../../../redux/Purchase.slice"
import Dropdown from '../../../../../../../../components/misc/pureComponents/dropdown/Dropdown';
import {getFocused  , setsubGridActiveNewitems} from "../../../redux/Purchase.slice"
const PurchaseaddSubgrid = ({title}) => {
  const [zero , setZero] = useState(false)
  const [disable , setDisable] = useState(false)

  

const dropdownRef = useRef(null)
  const dispatch = useDispatch()
    const valSkuList = useSelector((state) => state.PurchaseSlices.valSkuList)
    const rowData = useSelector((state) => state.PurchaseSlices.subGridState);
    const skuList = useSelector((state) => state.PurchaseSlices.skuList)
    const subGridActiveNewitems = useSelector((state) => state.PurchaseSlices.subGridActiveNewitems)
    const Ven_id = useSelector((state) => state.PurchaseSlices.newPurchaseForm )
  const VEN_ID = Ven_id.data.VEN_ID

    // // console.log('check active true VEN list' ,Ven_id);
    // // console.log('check active true VEN ID' ,VEN_ID);
    // // console.log('check active true VEN option' , Ven_option);
    // // console.log('check active true' , skuList);
    const handleRefocusDropdown = () => {
      if( dropdownRef.current){
          dropdownRef.current.focus();
          // alert("parent side focus dropdown pressed")
      }   
     
      };
    useEffect(()=>{
      if(subGridActiveNewitems == true){
        handleRefocusDropdown()
        dispatch(setsubGridActiveNewitems())
      }
    } , [subGridActiveNewitems])

    const handleCreateOption=(inputValue)=> {
        const newOption = {
            value: inputValue,
            label: inputValue,
        }
        setOptions([...options,newOption])
}

    const handleChangeOption = (e) =>{
        // // console.log("if it running check " , e);
        const slected = skuList.filter((data) => data.PAR_ID ==  e?.value) 
       const data = {
            id : slected[0] , 
           
        }
        if(zero == false){
            dispatch(setNewItem(data))

          }

    }

    useEffect(()=>{
        const hasZeroCount = rowData.some(item => parseInt(item.QUANTITY) === 0);
        // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);
        
      // setLotZero(hasZeroLot)
      setZero(hasZeroCount)
        // // console.log('// console if has zero' , hasZeroLot , hasZeroCount , dataDetails);
       
      },[rowData])


     

     const handleSelectedOptionChange = (option)=>{
      
      
    const  data = {
        id: option,
     
      };

      if(zero == false){
        dispatch(setNewItem(data))
        dispatch(getFocused({title:"Items" , focus:false}))
      
      }
     }

     const handleOnFocus = () => {
      // // console.log('log focus');
     
      dispatch(getFocused({title:"Items" , focus:true}))

      
      }
      const handleOnBlur = () => {
        // // console.log('log blur');
      dispatch(getFocused({title:"Items" , focus:false}))

      }


  
      // className={`${VEN_ID != null ? "m-1" : "m-4"}`}
  return (
    <div className="m-2">
        {/* <CreatableDropdown slectedOption={handleChangeOption} disableCheck={zero == false ? false : true} value={valSkuList} title={title} handleCreateOption={handleCreateOption}/> */}
        
        {VEN_ID != ""  && (
             <Dropdown  options={skuList} optionKey1={["PAR_ID","DESCRIPTION","OH_QUANTITY"]} optionKey2="PAR_ID" onSelectedOptionChanged ={handleSelectedOptionChange} placeholder="+ Add Item" inputClassName="w-[120px] focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="w-[500px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left" customFocusKey1 = "ctrlKey" customFocusKey = "p" isDisabled={zero == false ? false : true}
        onClearInputValue={true} onHandleFocus={handleOnFocus} onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
        )}
       
  
    </div>
  )
}

export default PurchaseaddSubgrid