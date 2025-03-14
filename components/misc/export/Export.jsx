"use client";

import { useState } from "react";
import { PiExportLight } from "react-icons/pi";
import { CSVLink } from "react-csv";
// import { CSVLink } from "react-csv";
// import CsvDownloader from "react-csv-downloader";

const Export = ({ exportProps }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isHover, setIsHover] = useState(true);

  const handleXLS = () => {
    // setSelectedFile(exportProps.fileExtension.xls);
    setSelectedFile(".xls");
  };
  const handleCSV = () => {
    // setSelectedFile(exportProps.fileExtension.xls);
    setSelectedFile(".csv");
  };
  const handlePDF = () => {
    // setSelectedFile(exportProps.fileExtension.xls);
    setSelectedFile(".pdf");
  };

  return (
    <div
      className={`h-full w-full flex items-center gap-2 px-2 hover:bg-customHover cursor-pointer rounded-[4px]`}
    >
      <PiExportLight className="text-[20px] text-customIcon" />
      <p className="">Export</p>
      <div className="flex">
        <div
          className="relative "
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
        >
          <div
            className={`hexagon w-full h-full absolute ${
              isHover ? "" : "hidden"
            }`}
          ></div>
          <CSVLink
            data={exportProps.data ? exportProps.data : []}
            filename={`${exportProps.fileName}.xls`}
            // extension=".xls"
          >
            <img
              className="w-[30px] p-[6px] "
              src="/icons/xls.png"
              // onClick={handleXLS}
            />
          </CSVLink>
        </div>

        <div
          className="relative  "
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
        >
          <div
            className={`hexagon w-full h-full absolute ${
              isHover ? "" : "hidden"
            }`}
          ></div>
          <CSVLink
            data={exportProps.data ? exportProps.data : []}
            filename={`${exportProps.fileName}.csv`}
            // extension=".csv"
          >
            <img
              className="w-[30px] p-[6px]"
              src="/icons/csv.png"
              // onClick={handleCSV}
            />
          </CSVLink>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHover(false)}
          onMouseLeave={() => setIsHover(true)}
        >
          <div
            className={`hexagon w-full h-full absolute ${
              isHover ? "" : "hidden"
            }`}
          ></div>

          <CSVLink
            data={exportProps.data ? exportProps.data : []}
            filename={`${exportProps.fileName}.pdf`}
            // filename={exportProps.fileName}
            // extension=".pdf"
          >
            <img
              className="w-[30px] object-contain p-[6px]"
              src="/icons/pdf.png"
              // onClick={handlePDF}
            />
          </CSVLink>
        </div>
      </div>
    </div>
  );
};

export default Export;
