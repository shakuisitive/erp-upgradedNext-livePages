import React from 'react'
import UoMBody from './_components/uomMainGrid/UoMBody'
import MainHeader from '../../../../../../components/misc/pureComponents/mainHeader/MainHeader'
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Uom"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        {/* <PMMainTab/> */}
        < UoMBody />
      </div>
    </div>
  )
}

export default page