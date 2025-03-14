import React, { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";

const PMColorImage = ({ index, onUpload, name, filePath, type }) => {
  const [files, setFiles] = useState([]);

  //   const getTempFileData = (data) => {
  //     //    setSelectedFiles(data?.FileNames);
  //   };
  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    let files = e.target.files;

    const data = new FormData();
    let urls = [];

    // let SourceOraSeqv = "";

    data.append("AttachNumber", "1");
    data.append("DistType", "Part");
    data.append("SeqNumber", "001");
    data.append("SourceOraSeq", "");
    data.append("AttachID", "");
    data.append("GenericJson", "");
    data.append("Description", "Test");
    data.append("PAR_ID", "");
    data.append("USERNAME", "admin");

    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
      data.append(name, files[i]);
    }

    onUpload({ data, urls, index, type });
  };
  useEffect(() => {
    setFiles(filePath);
  }, [filePath]);

  return (
    <div className="flex bg-white px-2 py-2 items-center gap-2">
      <GrAttachment className="text-[18px] text-customblack" />
      <label
        htmlFor={`color-${index}`}
        className="filesLabel items-center cursor-pointer text-[14px] text-customblack"
      >
        Add File
      </label>
      <input
        type="file"
        id={`color-${index}`}
        name={`color-${index}`}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
    </div>
  );
};

export default PMColorImage;
