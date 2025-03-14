import React from 'react'

const RemainingDays = ({data}) => {

    const daysUntilExpiration = () => {
        if (!data) return null;
    
        const expiryDate = new Date(data);
        const currentDate = new Date();
        const differenceInTime = expiryDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
        return Math.ceil(differenceInDays) <= 0 ? 0 : Math.ceil(differenceInDays);
      };
  return (
    <div className="flex justify-center items-center w-full">
      {daysUntilExpiration()}
    </div>
  )
}

export default RemainingDays
