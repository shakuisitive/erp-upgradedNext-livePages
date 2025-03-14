
import React , {useState} from 'react'



const TooltipStatus = ({ content, children }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    //  const [isOpen, setIsOpen] = useState(false);
    
    const [periority, setPeriority] = useState(["High", "Medium", "Low"])
const [statusArray , setStatusArray] = useState(["Working on it", "Done", "Stuck", "initiated", "issued", "Ready"])
//   // console.log("this is log" , content);

return (
     
        <div className="group relative  ">
            {isTooltipVisible && (
                <div className="absolute z-10 mr-[100px]  bg-white text-black w-[170px] p-4 rounded-md text-sm shadow-lg mt-8">
                 <div>
                    {
                        content == "High" || content == "Medium" || content == "Low" ?
                    
                    <div>
                        {
                            periority.map((data , i) => {
                                return (
                                    <div key={i} className={` cursor-pointer ${data == "High" ? "bg-orange-600" : data == "Medium" ? "bg-blue-400" : data == "Low" ? "bg-cyan-400" : data == "Working on it" ? "bg-yellow-400" : data == "Done" ? "bg-green-500" : data == "Stuck" ? "bg-red-600" : data == "initiated" ? "bg-zinc-400" : data == "issued" ? "bg-blue-600" : data == "Ready" ? "bg-indigo-400" : ""}  my-2 p-1 w-full shadow-md text-white text-center`}>
                                        <p>{data}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                    :""
}
                    </div>
                    {
                    content == "Working on it" || content == "Done" || content == "Stuck" || content == "initiated" || content == "issued" ||content == "Ready" ?
                    <div>
                    {
                            statusArray.map((data , i) => {
                                return (
                                    <div key={i} className={` cursor-pointer ${data == "High" ? "bg-orange-600" : data == "Medium" ? "bg-blue-400" : data == "Low" ? "bg-cyan-400" : data == "Working on it" ? "bg-yellow-400" : data == "Done" ? "bg-green-500" : data == "Stuck" ? "bg-red-600" : data == "initiated" ? "bg-zinc-400" : data == "issued" ? "bg-blue-600" : data == "Ready" ? "bg-indigo-500" : ""}  my-2 p-1 w-full shadow-md text-white text-center`}>
                                        <p>{data}</p>
                                    </div>
                                )
                            })
                        }
                    </div> : ""
}
                </div>
            )}
            <div
                className="inline-block   cursor-pointer"
                onClick={() => setTooltipVisible(!isTooltipVisible)}
            // onDoubleClick={() => setTooltipVisible(false)}
            >
                {children}
            </div>
        </div>
    );
};

export default TooltipStatus