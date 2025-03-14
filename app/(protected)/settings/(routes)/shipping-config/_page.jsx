import React from 'react'
import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);

const ShippingconfigBody = dynamic(
  ()=>
    import(
"./_components/ShippingconfigBody"
    ),
  {  ssr:false}
)

export default function page() {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Shipping Configure"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
      <ShippingconfigBody/>
      </div>
    </div>
  )
}
