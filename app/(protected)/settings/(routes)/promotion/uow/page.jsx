import React from 'react'
import UoWBody from "./_components/uowMainGrid/UoWBody"
import MainHeader from "../../../../../../components/misc/pureComponents/mainHeader/MainHeader";

const page = () => {

  return (
    <div className="h-[93vh] pb-5 flex flex-col">

        <MainHeader
        heading="Uow"/>
      <UoWBody/>
    </div>
  )
}

export default page