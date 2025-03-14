import React from 'react'

const PMActivityMessage = ({rowData}) => {
  return (
    <div 
    className="flex  ml-2 items-start h-full w-full text-[14px] text-customblack"
    dangerouslySetInnerHTML={{__html: rowData?.MESSAGE}}
    />

  )
}

export default PMActivityMessage