'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const PhysicalCountBody = dynamic(
  ()=> import("./_components/PhysicalCountBody") , 
  {
    ssr : false
  }
)

const PhysicalCountMHead = dynamic(
  ()=> import("./_components/PhysicalCountTopNav/PhysicalCountMHead") , 
  {
    ssr : false
  }
)
function page() {
  return (
    <div className='h-[93vh]  flex flex-col'>
        <div className='h-fit'>
          <PhysicalCountMHead heading="Physical Count" ptext="This is an example text "/>
        </div>
        <div className='overflow-auto grow w-full '>
         <PhysicalCountBody />    
        </div>
    </div>
  )
}

export default page