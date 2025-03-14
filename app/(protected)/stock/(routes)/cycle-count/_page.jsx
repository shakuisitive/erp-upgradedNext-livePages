'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const CycleCountBody = dynamic(
  ()=> import("./_components/CycleCountBody") , 
  {
    ssr : false
  }
)

const CycleCountMHead = dynamic(
  ()=> import("./_components/CycleCountTopNav/CycleCountMHead") , 
  {
    ssr : false
  }
)
function page() {
  return (
    <div className='h-[93vh]  flex flex-col'>
        <div className='h-fit'>
          <CycleCountMHead heading="Cycle Count" ptext="This is an example text "/>
        </div>
        <div className='overflow-auto grow w-full '>
         <CycleCountBody />    
        </div>
    </div>
  )
}

export default page