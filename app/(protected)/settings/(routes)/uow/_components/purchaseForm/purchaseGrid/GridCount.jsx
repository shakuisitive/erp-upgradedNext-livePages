import React from 'react'

const GridCount = ({index}) => {
  return (
    <div className='flex justify-center items-center  w-full text-[14px] text-customblack'>
        00{index+1}
    </div>
  )
}

export default GridCount