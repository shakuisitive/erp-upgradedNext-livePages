import React from 'react'
import parse from "html-react-parser"
export const Message = ({data,rowData,index}) => {
 
  return (
    <div className='text-gray-500 text-[14px] flex p-2 flex-wrap'>
      {parse(data)}
      </div>
  )
}
