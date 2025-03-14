"use client";

import { useState } from 'react';
import { SlRefresh } from "react-icons/sl";

const Refresh = (props) => {
    const [spinner, setSpinner] = useState(false);

    const onRefreshHandle = async () => {
        setSpinner(true);
        const spin = await props?.onRefresh();
        setSpinner(spin)
    }
    return (
        <div
            onClick={onRefreshHandle}
            className={props?.className ?? "border cursor-pointer hover:bg-customHover rounded-[4px] border-transparent flex items-center h-fit p-1 text-[18px] text-customIcon"}
        >
            <SlRefresh className={spinner ? 'animate-spin' : ''} />
        </div>
    );
};

export default Refresh;