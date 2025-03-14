import React from "react";

function Popover({ rowData, setIsPopup }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  const daysUntilExpiration = () => {
    if (!rowData.EXPIRY_DATE) return null;

    const expiryDate = new Date(rowData.EXPIRY_DATE);
    const currentDate = new Date();
    const differenceInTime = expiryDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    return Math.ceil(differenceInDays);
  };

  const isExpired = rowData.EXPIRY_DATE && new Date(rowData.EXPIRY_DATE) < new Date();

  return (
    <>
      <div
        id="popover"
        className="transition duration-1500 ease-in-out absolute bottom-16 ml-20 w-full sm:w-[370px]"
      >
       {
        isExpired ? (
            <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Expiry</strong>
            <span className="block sm:inline ml-3">
              {rowData?.EXPIRY_DATE && formatDate(rowData?.EXPIRY_DATE)}
            </span>
            <span className="block sm:inline ml-3">
              date expired
            </span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setIsPopup(false)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ): (
            <div
            className="bg-[#b9dae6] border border-[#82c9e0] text-black px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Expiry</strong>
            <span className="block sm:inline ml-3">
              {rowData?.EXPIRY_DATE && formatDate(rowData?.EXPIRY_DATE)}
            </span>
            <span className="block sm:inline ml-3">
              {daysUntilExpiration() && `(${daysUntilExpiration()}) days left`}
            </span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setIsPopup(false)}
            >
              <svg
                className="fill-current h-6 w-6 text-black"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )
       }
      </div>
    </>
  );
}

export default Popover;
