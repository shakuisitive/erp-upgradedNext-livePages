import React from 'react'
import CreateLot from './../CreateLot';

function LotCreateDrawer({rowData, newLotNumber}) {
  return (
    <>
      <div className="h-full flex flex-col gap-4 w-full justify-between bg-[url('/lotVeactor.png')] bg-center bg-[length:380px] bg-no-repeat mb-2 rounded-t-md ">
        <CreateLot skuData={rowData} newLotNumber={newLotNumber} />
      </div>
    </>
  )
}

export default LotCreateDrawer
