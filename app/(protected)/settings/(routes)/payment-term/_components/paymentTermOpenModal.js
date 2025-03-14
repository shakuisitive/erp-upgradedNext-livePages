"use client";

import React, { useState , useEffect } from "react";


import { GrExpand } from "react-icons/gr";

import { openForm } from "../_redux/paymentTermSlice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../customHook/useApiFetch";


const OpenModal = ({index}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  let [error, sendRequest] = useApiFetch();
 
  // console.log('check index in table' , index);

  // console.log('get purchase in apply buuton' , dataDetails);


  const dispatch = useDispatch();
  // console.log('modall index' , index);
  const handleOpenModal = () => {
    console.log("open modal clicked",index.PAYTER_ID)
    setIsModalOpen(true);
    dispatch(openForm(index.PAYTER_ID));
  };
  
  

 
  return (
    <div className="ml-2">
        <div   onClick={handleOpenModal} className=" hidden items-center mr-2  group-hover:flex cursor-pointer "><GrExpand className="mr-2" />Activity</div>
      
    </div>
  )
}

export default OpenModal