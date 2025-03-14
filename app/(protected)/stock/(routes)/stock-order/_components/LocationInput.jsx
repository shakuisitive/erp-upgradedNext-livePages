"use client"

import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLocationValid } from "../redux/stockSlice";
const LocationInput = (props) => {
     const dispatch = useDispatch();

    const [location,setLocation] = useState();
    const [isLocationValid,setIsLocationValid] = useState(true);


    const locationChangeHandler = (e) =>{
     setLocation(e.target.value.toString());
     setIsLocationValid(true);
     if(e.target.value.toString().length==8){
        dispatch(setLocationValid(true));
     }else{
        dispatch(setLocationValid(false));
     }
    }
    

   useEffect(()=>{
    const timeoutId = setTimeout(() => {
        if(location?.length==8){
            setIsLocationValid(true);
            }else if(location){
               setIsLocationValid(false);
            }
           
      }, 2000);
      return () => clearTimeout(timeoutId);
    
   },[location])
 



  return (
    <div className={`w-full bg-red-800 ${isLocationValid?"":"border-2 border-solid border-red-500"}`}>
      <input type="number" onChange={locationChangeHandler} className={`w-full h-full focus:outline-none p-1 text-xl `}/>
    </div>
  )
}

export default LocationInput