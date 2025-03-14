import React from 'react'
import PMVarianceHeader from './Header/PMVarianceHeader'

const PMVariance = () => {
     const handleUpdatedRow = (rows) => {
    // console.log("Updated row",rows)

  };

  return (
    <div>
      <PMVarianceHeader HTitle="Flavor" onUpdatedRow={handleUpdatedRow}/>
      <PMVarianceHeader HTitle="Color" HTitleColor="pink" onUpdatedRow={handleUpdatedRow}/>
      <PMVarianceHeader HTitle="Size" onUpdatedRow={handleUpdatedRow}/>
      <PMVarianceHeader HTitle="Material" onUpdatedRow={handleUpdatedRow}/>
    </div>
  )
}

export default PMVariance
