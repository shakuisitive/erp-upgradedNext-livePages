import React from 'react'

function StockStatus({data}) {
     
    return (
        <div className={`w-full flex items-center justify-center ${data == "Full Transferred |Full Assigned" ? "bg-green-400" :data == "NEW" ?  "bg-cyan-400" : data == "Not Assigned"?"bg-zinc-400":data == "Initiated" ? 'bg-gray-400':data == "Full Transferred | Partial Assigned" ? 'bg-zinc-400':data =="Full Transferred |Not Assigned"?
    "bg-indigo-500":data == "Partial Transferred |Not Assigned"? "bg-sky-400":data == 
    "Partial Transferred | Partial Assigned"? "bg-orange-400" :''} `}>
            
            <p className='text-[14px] text-white'>{data}</p>
            </div>
      )
  
}

export default StockStatus