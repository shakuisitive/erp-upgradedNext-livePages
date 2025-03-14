'use client'
import React from 'react'
// import StockGridView from './_components/StockGridView'
// import DashboardNav from '../../../../../components/misc/landingNavebar/DashboardNav'
import dynamic from 'next/dynamic'

const StockGridView = dynamic(
  ()=> import("./_components/StockGridView") , 
  {
    ssr : false
  }
)

const DashboardNav = dynamic(
  ()=> import("../../../../../components/misc/globalComponents/landingNavebar/DashboardNav") , 
  {
    ssr : false
  }
)

const StockOrderMHead = dynamic(
  ()=> import("./_components/StockOrderTopNav/StockOrderMHead") , 
  {
    ssr : false
  }
)
function page() {
 


  return (
    <div className='h-[93vh]  flex flex-col'>
        <div className='h-fit'>
          <  StockOrderMHead heading="Stock Order" ptext="This is an example text "/>
        </div>
        <div className='overflow-auto grow w-full '>
         <StockGridView />    
        </div>
        
        {/* <button onClick={handleOpenModal}>Stock order form</button>
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} tabs={tabs} heading="Receiving Form" /> */}
    </div>
  )
}

export default page