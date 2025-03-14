"use client"
import React, { useState } from 'react'
import Tooltip from './GridTooltip'


const GridStatusCell = ({ StatusData }) => {
    return (
        <div className='w-full '>

            <div className={`${StatusData == "High" ? "bg-orange-600" : StatusData == "Medium" ? "bg-blue-400" : StatusData == "Low" ? "bg-cyan-400" : StatusData == "Working on it" ? "bg-yellow-400" : StatusData == "Done" ? "bg-green-500" : StatusData == "Stuck" ? "bg-red-600" : StatusData == "initiated" ? "bg-zinc-400" : StatusData == "issued" ? "bg-blue-600" : StatusData == "Ready" ? "bg-indigo-500" : ""} h-full w-full text-white flex items-center justify-center text-center`}>
                <Tooltip content={StatusData} >
                    <p className='py-1 text-[14px] lgdesktop:text-lg'>{StatusData}</p>
                </Tooltip>
                
            </div>
        </div>
    )
}

export default GridStatusCell