import React from 'react'

function TaxName({rowData}) {
    console.log(rowData,"rowdata");
    
  return (
    <div className='flex justify-center items-center text-center w-full'>
        {rowData?.NAME}
      
    </div>
  )
}

export default TaxName