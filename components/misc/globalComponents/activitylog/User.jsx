import React from 'react'

const User = ({ rowData }) => {
  return (
    <div className="flex  ml-2 items-start h-full w-full text-[14px] text-customblack">
        {rowData?.USERNAME}
 </div> 
  )
}

export default User