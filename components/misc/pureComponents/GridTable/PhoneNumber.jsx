import React from 'react'
import Image from 'next/image'

const PhoneNumber = ({data}) => {
  return (
    <div className='flex h-full items-center text-[14px] bg-pink-400 text-pink-400 pl-2 '><Image src="/flag.jpg" width='20px' height='auto' className='w-[20px] mr-2 ' alt="flag" />{data}</div>
  )
}

export default PhoneNumber 