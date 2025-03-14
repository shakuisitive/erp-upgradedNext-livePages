"use client"

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageFunction } from "../../../../redux/mobilBotNav/mobilBotNav.slice";
const MobBotNav = () => {

    const dispatch = useDispatch()

    const pageState = useSelector((state) => state.MobilBotNavSlices.pageState)

    
    const navFunction = (page) => {
        dispatch(pageFunction(page))
    }

    return (
        <div className=" h-[70px] shadow-inner  bg-white  rounded-t-xl w-full lg:hidden md:hidden sm:hidden block  fixed bottom-0 z-10 ">
            <div className="grid grid-cols-5 h-full content-end pb-2 ">

                <div onClick={() => navFunction(0)} className="flex justify-center group ">
                    <div className=" flex ">
                        <div className="">
                            <div className={`w-full flex  justify-center  ${pageState == 0 ? "-translate-y-0 " : "translate-y-3"} transition-all duration-700  `}>
                                <svg width="25" height="25" viewBox="0 0 24 24" fill={pageState == 0 ? "#0000FF" : 'none'} xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="9" height="9" rx="2" fill={pageState == 0 ? "#0000FF" : 'currentColor'}></rect><rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill={pageState == 0 ? "#0000FF" : 'currentColor'}></rect><rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill={pageState == 0 ? "#0000FF" : 'currentColor'}></rect><rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill={pageState == 0 ? "#0000FF" : 'currentColor'}></rect></svg>
                            </div>
                            <div className="h-5">
                                <p className={`text-[14px] ${pageState == 0 ? "block  transition-all duration-700" : "hidden"}   font-bold text-gray-500`}>Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div onClick={() => navFunction(1)} className="flex justify-center group ">
                    <div className=" flex ">
                        <div className="">
                            <div className={`w-full flex  justify-center  ${pageState == 1 ? "-translate-y-0 " : "translate-y-3"} transition-all duration-700  `}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill={pageState == 1 ? "#0000FF" : "none"} xmlns="http://www.w3.org/2000/svg"><path d="M21 9V11C21 11.6 20.6 12 20 12H14V8H20C20.6 8 21 8.4 21 9ZM10 8H4C3.4 8 3 8.4 3 9V11C3 11.6 3.4 12 4 12H10V8Z" fill={pageState == 1 ? "#0000FF" : 'currentColor'} ></path><path d="M15 2C13.3 2 12 3.3 12 5V8H15C16.7 8 18 6.7 18 5C18 3.3 16.7 2 15 2Z" fill={pageState == 1 ? "#0000FF" : 'currentColor'}></path><path opacity="0.3" d="M9 2C10.7 2 12 3.3 12 5V8H9C7.3 8 6 6.7 6 5C6 3.3 7.3 2 9 2ZM4 12V21C4 21.6 4.4 22 5 22H10V12H4ZM20 12V21C20 21.6 19.6 22 19 22H14V12H20Z" fill={pageState == 1 ? "#0000FF" : 'currentColor'}></path></svg>
                            </div>
                            <div className="h-5">
                                <p className={`text-[14px] ${pageState == 1 ? "block  transition-all duration-700" : "hidden"}   font-bold text-gray-500`}>Stock</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div onClick={() => navFunction(2)} className="flex justify-center group ">
                    <div className=" flex ">
                        <div className="">
                            <div className={`w-full flex  justify-center  ${pageState == 2 ? "-translate-y-0 " : "translate-y-3"} transition-all duration-700  `}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill={pageState == 2 ? "#0000FF" : "none"} xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M2.10001 10C3.00001 5.6 6.69998 2.3 11.2 2L8.79999 4.39999L11.1 7C9.60001 7.3 8.30001 8.19999 7.60001 9.59999L4.5 12.4L2.10001 10ZM19.3 11.5L16.4 14C15.7 15.5 14.4 16.6 12.7 16.9L15 19.5L12.6 21.9C17.1 21.6 20.8 18.2 21.7 13.9L19.3 11.5Z" fill={pageState == 2 ? "#0000FF" : "currentColor"}></path><path d="M13.8 2.09998C18.2 2.99998 21.5 6.69998 21.8 11.2L19.4 8.79997L16.8 11C16.5 9.39998 15.5 8.09998 14 7.39998L11.4 4.39998L13.8 2.09998ZM12.3 19.4L9.69998 16.4C8.29998 15.7 7.3 14.4 7 12.8L4.39999 15.1L2 12.7C2.3 17.2 5.7 20.9 10 21.8L12.3 19.4Z" fill={pageState == 2 ? "#0000FF" : "currentColor"}></path></svg>
                            </div>
                            <div className="h-5">
                                <p className={`text-[14px] ${pageState == 2 ? "block  transition-all duration-700" : "hidden"}   font-bold text-gray-500`}>Sales</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div onClick={() => navFunction(3)} className="flex justify-center group ">
                    <div className=" flex ">
                        <div className="">
                            <div className={`w-full flex  justify-center  ${pageState == 3 ? "-translate-y-0 " : "translate-y-3"} transition-all duration-700  `}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill={pageState == 3 ? "#0000FF" : "none"} xmlns="http:www.w3.org/2000/svg"><path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill={pageState == 3 ? "#0000FF" : "currentColor"}></path><path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill={pageState == 3? "#0000FF" : "currentColor"}></path></svg>

                            </div>
                            <div className="h-5">
                                <p className={`text-[14px] ${pageState == 3 ? "block  transition-all duration-700" : "hidden"}   font-bold text-gray-500`}>Adminster</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div onClick={() => navFunction(4)} className="flex justify-center group ">
                    <div className=" flex ">
                        <div className="">
                            <div className={`w-full flex  justify-center  ${pageState == 4 ? "-translate-y-0 " : "translate-y-3"} transition-all duration-700  `}>
                            <svg width="30" height="30" viewBox="0 0 24 24" fill={`${pageState == 4 ? "#0000FF" : "none"}`} xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill={`${pageState == 4 ? "#0000FF" : "currentColor"}`}></path><path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill={`${pageState == 4 ? "#0000FF" : "currentColor"}`}></path></svg>
                            </div>
                            <div className="h-5">
                                <p className={`text-[14px] ${pageState == 4 ? "block  transition-all duration-700" : "hidden"}   font-bold text-gray-500`}>Security</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MobBotNav