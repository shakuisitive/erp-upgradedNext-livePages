import React from 'react'

function TaxName2({rowData}) {
    console.log(rowData,"rowdata");
    
  return (
    <div className='flex justify-center items-center text-center w-full'>
        {rowData?.OTHER_NAME}
      
    </div>
  )
}

export default TaxName2