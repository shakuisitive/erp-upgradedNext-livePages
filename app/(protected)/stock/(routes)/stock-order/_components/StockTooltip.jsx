import React from "react";

function StockTooltip({ content, children }) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [periority, setPeriority] = useState(["High", "Medium", "Low"]);
  const [statusArray, setStatusArray] = useState([
    "Full Transferred |Full Assigned",
    "Initiated",
    "NEW",
    "Full Transferred | Not Assigned", 
    "Partial Transferred |Not Assigned",
    "Partial Transferred | Partial Assigned"
  ]);
  return (
    <div className="group relative ">
      {isTooltipVisible && (
        <div className="absolute z-10  bg-white text-black w-[170px] p-4 rounded-md text-sm shadow-lg mt-8">
          <div>
            {content == "High" || content == "Medium" || content == "Low" ? (
              <div>
                {periority.map((data , i) => {
                  return (
                    <div
                    key={i}
                      className={` cursor-pointer ${
                        data == "High"
                          ? "bg-orange-600"
                          : data == "Medium"
                          ? "bg-blue-400"
                          : data == "Low"
                          ? "bg-cyan-400"
                          : data == "Working on it"
                          ? "bg-yellow-400"
                          : data == "Done"
                          ? "bg-green-500"
                          : data == "Stuck"
                          ? "bg-red-600"
                          : data == "initiated"
                          ? "bg-zinc-400"
                          : data == "issued"
                          ? "bg-blue-600"
                          : data == "Ready"
                          ? "bg-indigo-500"
                          : ""
                      }  my-2 p-1 w-full shadow-md text-white text-center`}
                    >
                      <p>{data}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {content == "Full Transferred | Full Assigned" ||
          content == "Not Transferred |Full Assigned" ||
          content == "initiated" ||
          content == "NEW" ||
          content ==  "Initiated" ||
          content ==  "Partial Transferred | Partial Assigned" ||
          content == "Partial Transferred |Not Assigned" 
         ? (
            <div>
              {statusArray.map((data , i) => {
                return (
                  <div
                  key={i}
                    className={` cursor-pointer ${
                      data == "Full Transferred | Full Assigned" ? "bg-orange-600" : data == "Medium"
                        ? "bg-blue-400"
                        : data == "Low"
                        ? "bg-cyan-400"
                        : data == "Working on it"
                        ? "bg-yellow-400"
                        : data == "Done"
                        ? "bg-green-500"
                        : data == "Stuck"
                        ? "bg-red-600"
                        : data == "initiated"
                        ? "bg-zinc-400"
                        : data == "issued"
                        ? "bg-blue-600"
                        : data == "Ready"
                        ? "bg-indigo-500"
                        : ""
                    }  my-2 p-1 w-full shadow-md text-white text-center`}
                  >
                    <p>{data}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
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
}

export default StockTooltip;
