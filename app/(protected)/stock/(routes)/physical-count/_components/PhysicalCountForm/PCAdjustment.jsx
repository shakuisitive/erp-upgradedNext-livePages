import React, { useEffect, useState } from 'react'

const PCAdjustment = ({rowData}) => {
  

  return (
    <div className='w-full flex items-center px-[3px] justify-center text-[14px] text-customblack'>
      <p>{rowData.ADJUSTMENT}</p>
    </div>
  )
}

export default PCAdjustment