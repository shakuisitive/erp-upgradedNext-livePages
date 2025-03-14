import React from "react";
import * as dateFns from "date-fns";

const expiryData = ({ data }) => {

  const formatDate = (dateString) => {
    if(dateString) {

        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}`;
    }
  };

  return <div className="flex w-full justify-center items-center ">{formatDate(data)}</div>;
};

export default expiryData;
