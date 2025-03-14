import React from 'react'

const GridStatus = ({data , index , rowData}) => {
  return (
    <div className='size-full relative'>
      <div style={{backgroundColor:rowData?.color ? rowData.color : '#007f9b'}} className={`w-full h-full flex items-center cursor-pointer justify-center  `}>
      <p className='text-[14px] leading-normal  line-clamp-1 text-white'>{data}</p>
      </div>
    </div>
  )
}

export default GridStatus
