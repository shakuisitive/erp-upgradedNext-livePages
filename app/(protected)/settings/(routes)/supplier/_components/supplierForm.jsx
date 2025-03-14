import React, { useEffect, useState } from 'react'
import InputTextEut from '../../../../../../components/misc/pureComponents/textinput/InputTextEut'
import TextArea from '../../../../../../components/misc/pureComponents/textinput/TextArea'
import { useSelector,useDispatch} from 'react-redux';
import FormHeader from "./supplierFormHeader";
import StatusToolTip from "./ModalFormStatus";
import {isObjectsEqul} from "./customeFunction"
import {setFormPayload,setObjectEqual} from "../redux/supplierSlice"
const PaymentTermForm = () => {
  let index = useSelector(state => state.supplier.formIndex);
  let allData = useSelector(state => state.supplier.supplierMainGrid);
  let enabled_ = useSelector(state => state.supplier.enabled);
  console.log("all supplier",allData);
  console.log("form index",index);

  let data=allData?.filter(item=>item.PAYTER_ID==index)[0];
  let user_ID = useSelector(state => state.supplier.user_ID);
  let username=useSelector(state => state.supplier.username);
  const dispatch=useDispatch();
console.log(enabled_,"enabled")
  const [enabled,setEnabled]=useState(enabled_);
   const [code,setCode]=useState(data?.CODE)
  const [name,setName]=useState(data?.NAME);
  const [termDays,setTermDays]=useState(data?.DURATION_IN_DAYS);
  const [notes,setNotes]=useState(data?.DESCRIPTION)
  const [status, setStatus] = useState(data?.ACTIVE_FLAG);

  let prevData={
    NAME: data?.NAME,
    PAYTER_ID: data?.PAYTER_ID,
    CODE: data?.CODE,
    DURATION_IN_DAYS: data?.DURATION_IN_DAYS,
    DESCRIPTION:data?.DESCRIPTION,
    USE_ID: user_ID,
    ACTIVE_FLAG: data?.ACTIVE_FLAG,
  }
  
  if(code===''){
    setEnabled(false)
  }



  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handelChangeCode=(e)=>{
    setCode(e.target.value)
  }
  const handelChangeName=(e)=>{
    setName(e.target.value)
  }
  const handelChangeTermDays=(e)=>{
    setTermDays(e.target.value)
  }
  const handelChangeNotes=(e)=>{
    setNotes(e.target.value)
  }


  let newData={
    NAME: name?.toString() || "",
    PAYTER_ID: data?.PAYTER_ID,
    CODE: code?.toString(),
    DURATION_IN_DAYS: parseInt(termDays) || "",
    DESCRIPTION:notes?.toString(),
    USE_ID: user_ID,
    ACTIVE_FLAG: status?.toString(),
  }
  

  


  const payload={
    data: newData,
    action: "Administration",
    method: "PostPaymentTerm",
    username: username,
    type: "rpc",
    tid: "144"
  }
 // console.log(newData,prevData)
 dispatch(setFormPayload(payload))
 dispatch(setObjectEqual(isObjectsEqul(prevData,newData)))


  return (

    <>
      <div className="  h-[98%] mt-[4px] gap-2   flex  flex-col   rounded-lg">
        <div
          // className={`  flex flex-col relative  border ${
          //   formColaps == true
          //     ? "grow"
          //     : "lgdesktop:w-[100%]   desktop:w-[75%] laptop:w-[60%] tablet:w-[50%]"
          // }   rounded-md bg-white`}
          className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white"
        >
          <FormHeader suplier={data?.PAYTER_ID} />
          <div className="py-1 w-full bg-gray-100"></div>
      
        <div className='flex gap-x-5'>

        <div className='w-1/3 ml-3 mt-1 flex flex-col gap-y-2 p-5 bg-white'>

        <div className={""}><InputTextEut placeHolder={"CODE"} classes={`${enabled_?"cursor-not-allowed bg-slate-100":""}`} isDisabled={enabled_} value={code} onChange={handelChangeCode} /></div> 
          <InputTextEut placeHolder={"Name"} value={name}  onChange={handelChangeName}/>
          <InputTextEut placeHolder={"Term Days"} value={termDays} onChange={handelChangeTermDays} />
          <TextArea placeHolder={"Notes"}  value={notes} onChange={handelChangeNotes}/>




        </div>
        <div className='w-1/6'>
          <div className='w-full mt-4 flex justify-center'>
            <div className={`w-full max-w-[430px] ${status == "Y" ? "bg-green-400" : "bg-red-400"} text-white flex justify-center items-center font-semibold py-2 rounded-full`}>
              <StatusToolTip content={status} statusClick={handleStatusChange}>

                <p>
                  {status == "Y" ? "Active" : "Inactive"}

                </p>
              </StatusToolTip>

            </div>
          </div>

        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default PaymentTermForm


