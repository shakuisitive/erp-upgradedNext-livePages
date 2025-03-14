import React, { useEffect , useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updatePurchaseSku } from "../../../redux/Purchase.slice"
import CreatAbleDropdown  from "../../CreateAbleDropDownTemp"


const PurchaseGridSku = ({data, rowData, index}) => {
    
const [arr , setArr] = useState([])
const [arrT , setArrT] = useState([])
    const dispatch = useDispatch()

    const skuList = useSelector((state) => state.PurchaseSlices.skuList)
    const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
    const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);

    // // console.log('checkUpdatelist' , checkUpdatelist);

useEffect(()=>{
    
setArr(skuList)
},[skuList])
useEffect(() => {
    if (arr.length > 0) { // Check if arr is not empty
      const sortedArr = [...arr]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.PAR_CODE === data) return -1; // 'Ali' comes before 'Ahmad' and 'Raza'
        if (b.PAR_CODE === data) return 1; // 'Ali' comes before 'Ahmad' and 'Raza'
        return 0; // Maintain order for other elements
      });

      const option = sortedArr.map((dataa) => {
        const list = {};

        list.value = dataa.PAR_ID;
        list.label = dataa.PAR_CODE;

        return list;
      });
      setArrT(option); // Update the state with the sorted array
    //   // console.log('check options' , option);
    }
  }, [arr, data]);

      // console.log('check sku index' , data , arrT);
    const setChange = (e) => {

        const slected = skuList.filter((data) => data.PAR_ID ==  e.target.value) ,

        data = {
            id : slected[0] , 
            indexR : index
        }

        dispatch(updatePurchaseSku(data))
        // // console.log('slected sku data' , slected);


    }
    const handleCreateOption=(inputValue)=> {
        const newOption = {
            value: inputValue,
            label: inputValue,
        }
        setOptions([...options,newOption])
}

const handleChangeOption = (e) =>{

    const slected = skuList.filter((data) => data.PAR_ID ==  e.value) ,

    data = {
        id : slected[0] , 
        indexR : index
    }

    dispatch(updatePurchaseSku(data))
    // // console.log('slected sku data' , slected);


}
    return (
        <div className='w-full h-full flex justify-center items-center pr-2 '>
            {/* <MdOutlineKeyboardArrowDown  className='text-[25px] text-gray-500' /> */}

            <CreatAbleDropdown slectedOption={handleChangeOption} value={arrT} handleCreateOption={handleCreateOption} />

            {/* <select 
             onChange={setChange}
              className="block w-full mt-1 p-2 pr-8 flex-col rounded-md shadow-sm focus:outline-none "
               name=""
                id=""
                disabled={FormStatus == 'Initiated' ? false : true}
                >

                {
                    arr?.map((dataa , i) => {
                        return (
                            <option key={i} className={`my-4 text-[16px] font-bold `} value={dataa.PAR_ID}>{dataa.PAR_CODE}</option>

                        )
                    })
                }
            </select> */}
        </div>
    )
}

export default PurchaseGridSku