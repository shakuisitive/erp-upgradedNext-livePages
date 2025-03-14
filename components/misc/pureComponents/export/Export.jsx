"use client";
// "use client";

// import { useState } from "react";
// import { PiExportLight } from "react-icons/pi";
// import { CSVLink } from "react-csv";

// const datas = [
//   {
//     cell1: "row 1 - cell 1",
//     cell2: "row 1 - cell 2",
//   },
//   {
//     cell1: "row 2 - cell 1",
//     cell2: "row 2 - cell 2",
//   },
// ];

/*import React, { useState } from "react";
import { CSVLink } from "react-csv";
import PiExportLight from "some-icon-library"; // Import your icon

const Export = (props) => {
  const [selectedFile, setSelectedFile] = useState("xls");

  const handleClick = () => {
    setSelectedFile("xls");
    console.log("xls clicked");
  };

  const handleClickCSV = () => {
    setSelectedFile("csv");
    console.log("csv clicked");
  };
  console.log("selected File", selectedFile);
  // const headers = Object.keys(props.datas[0] || {}).map((key) => ({
  //   label: key,
  //   key,
  // }));

  return (
    <div className="h-full w-full flex items-center gap-2 px-2 rounded-[4px]">
      <PiExportLight className="text-[20px] text-customIcon" />
      <p className="">Export</p>
      <div className="flex">
        {!props?.xls && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "xls" ? "bg-[#0073ea]" : ""
            }`}
            onClick={handleClick}
          >
            <CSVLink
              // headers={headers}
              data={props.datas}
              filename={props?.fileName ?? "Download.xls"}
              separator=";"
              className="flex items-center"
            >
              <img
                className="w-[30px] p-[6px]"
                src="/icons/xls.png"
                alt="xls icon"
              />
            </CSVLink>
          </div>
        )}

        {!props?.cvs && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "csv" ? "bg-[#0073ea]" : ""
            }`}
            onClick={handleClickCSV}
          >
            <CSVLink
              // headers={headers}
              data={props.datas}
              filename={props?.fileName ?? "Download.csv"}
              separator=","
              className="flex items-center"
            >
              <img
                className="w-[30px] p-[6px]"
                src="/icons/csv.png"
                alt="csv icon"
              />
            </CSVLink>
          </div>
        )}

        {!props?.pdf && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "pdf" ? "bg-[#0073ea]" : ""
            }`}
            onClick={() => setSelectedFile("pdf")}
          >
            <img
              className="w-[30px] object-contain p-[6px]"
              src="/icons/pdf.png"
              alt="pdf icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Export;*/

import { useState } from "react";
import { PiExportLight } from "react-icons/pi";
import CsvDownloader from "react-csv-downloader";

const datas = [
  {
    cell1: "row 1 - cell 1",
    cell2: "row 1 - cell 2",
  },
  {
    cell1: "row 2 - cell 1",
    cell2: "row 2 - cell 2",
  },
];

const Export = (props) => {
  const [selectedFile, setSelectedFile] = useState("xls");

  // const onRefreshHandle = async () => {
  //     setSpinner(true);
  //     const spin = await props.onRefresh();
  //     setSpinner(spin);
  // };
  return (
    <div className={`h-full w-full flex items-center gap-2 px-2 rounded-[4px]`}>
      <PiExportLight className="text-[20px] text-customIcon" />
      <p className="">Export</p>
      <div className="flex">
        {!props?.xls && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "xls" ? "bg-[#0073ea]" : ""
            }`}
            onClick={() => setSelectedFile("xls")}
          >
            <CsvDownloader
              filename={props?.fileName ?? "Download"}
              extension=".xls"
              separator=";"
              wrapColumnChar="'"
              // columns={columns}
              datas={datas}
            >
              <img className="w-[30px] p-[6px] " src="/icons/xls.png" />
            </CsvDownloader>
          </div>
        )}

        {!props?.csv && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "csv" ? "bg-[#0073ea]" : ""
            }`}
            onClick={() => setSelectedFile("csv")}
          >
            <CsvDownloader
              filename={props?.fileName ?? "Download"}
              extension=".csv"
              separator=";"
              wrapColumnChar="'"
              // columns={columns}
              datas={datas}
            >
              <img className="w-[30px] p-[6px]" src="/icons/csv.png" />
            </CsvDownloader>
          </div>
        )}

        {!props?.pdf && (
          <div
            className={`relative hexagon w-full h-full hover:bg-customHover cursor-pointer ${
              selectedFile === "pdf" ? "bg-[#0073ea]" : ""
            }`}
            onClick={() => setSelectedFile("pdf")}
          >
            <img
              className="w-[30px] object-contain p-[6px]"
              src="/icons/pdf.png"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Export;
