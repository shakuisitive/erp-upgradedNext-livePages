"use client";

import { useState } from 'react';
import { SlRefresh } from "react-icons/sl";

const Refresh = ({ onRefresh , onRefreshHandle }) => {
  const [spinner, setSpinner] = useState(false);

 


  return (
    <div
      onClick={onRefreshHandle}
      className="border cursor-pointer hover:bg-customHover rounded-[4px] border-transparent flex items-center h-fit p-1 text-[18px] text-customIcon"
    >
      <SlRefresh className={spinner ? 'rotate-180' : ''} />
    </div>
  );
};


export default Refresh;