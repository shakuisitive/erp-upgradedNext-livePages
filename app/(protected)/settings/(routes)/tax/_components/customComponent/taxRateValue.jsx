import React from 'react'

function TaxRateValue({rowData}) {
    console.log(rowData,"rowdata");
    
  return (
    <div className='flex justify-center items-center text-center w-full'>
        {rowData?.OTHER_VALUE}
      
    </div>
  )
}

export default TaxRateValue