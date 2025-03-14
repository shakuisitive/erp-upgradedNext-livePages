import React, { useState, useRef, useEffect } from "react";
import {
  RiAddCircleFill,
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
} from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { deleteAttachment, setImagesData } from "../../../redux/pmSlice";

const FileUpload = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const scrollContainerRef = useRef(null);
  const [base64Url, setBase64Url] = useState([]);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const imagesData = useSelector((state) => state.pmSlices.ImagesData);
  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const partAttachmentPayload = {
    data: {
      PAR_ID: formIndex?.PAR_ID,
      SEARCH: "",
    },
    action: "ITEMMASTER",
    method: "GetPartAttachments",
  };

  useEffect(() => {
    if (onUpload && files.length > 0) {
      onUpload(files);
    }
  }, [files, onUpload]);

  // setFiles((prevFiles) => [...fileList, ...prevFiles]);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    // setFiles((prevFiles) => [fileList[0], ...prevFiles]);
    setFiles([...files, ...fileList]);
  };

  const handleDAFun = (data) => {
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        ItemMaster.GetPartAttachments,
        "POST",
        partAttachmentPayload,
        handleGetPartAttachments,
        token
      );
    }
  };
  const handleDelete = (index) => {
    const deleteAttachmentPayload = {
      data: {
        SOURCEORASEQ: formIndex?.PAR_ID,
        ATTACH_NAME: "",
      },
      action: "ITEMMASTER",
    };
    sendRequest(
      ItemMaster.DeleteAttachment,
      "POST",
      deleteAttachmentPayload,
      handleDAFun,
      token
    );

    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  const handleGetPartAttachmentsData = (data) => {
    setBase64Url((prev) => [...prev, data?.Message]);
  };

  const handleGetPartAttachments = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setImagesData(data?.Result));
    }
  };

  const handleDeleteAttachment = (data) => {
    const deleteAttachmentPayload = {
      data: {
        SOURCEORASEQ: data?.SOURCE_ORASEQ,
        ATTACH_NAME: data?.ATTACH_NAME,
      },
      action: "ITEMMASTER",
    };

    if (data) {
      sendRequest(
        ItemMaster.DeleteAttachment,
        "POST",
        deleteAttachmentPayload,
        handleDAFun,
        token
      );
    }
  };

  useEffect(() => {
    if (imagesData?.length > 0) {
      imagesData?.forEach((item) => {
        const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}ITEMMASTER/GetAttachmentFile?ModuleName=PART&AttachName=${item?.ATTACH_NAME}`;
        fetch(baseUrl, {
          method: "GET",
          body: null,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Something went wrong");
            }
            return response.json();
          })
          .then((data) => {
            handleGetPartAttachmentsData(data);
          });
      });
    }
  }, [imagesData]);

  return (
    <div className="relative w-full overflow-hidden border pl-[150px] pr-[30px] h-[142px] border-customgreen rounded-[6px] m-[25px]">
      <div className="absolute left-[30px] top-1/2 -translate-y-1/2">
        <label htmlFor="file-upload" className="block cursor-pointer">
          <div className="">
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <div className="flex items-center justify-center w-[112px] h-[112px] border-2 border-sky-400 rounded-md cursor-pointer">
              <RiAddCircleFill className="text-[25px] text-gray-400" />
            </div>
          </div>
        </label>
      </div>
      <div className="absolute left-[2px] top-1/2 -translate-y-1/2">
        <button className="text-[24px] text-gray-400" onClick={handlePrev}>
          <RiArrowLeftDoubleFill />
        </button>
      </div>

      <div className="flex items-center p-[12px] pt-[14px] file-upload-scroll">
        {files.length > 0 && (
          <div className="relative flex-shrink-0 mr-2">
            <img
              src={URL.createObjectURL(files[0])}
              alt={`Preview ${files[0]?.name}`}
              className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md cursor-pointer"
            />
            <button
              onClick={() => handleDelete(0)}
              className="absolute top-2 right-2 p-1 rounded-md text-white hover:bg-customGray focus:outline-none focus:ring"
            >
              <RxCross1 className="text-[12px] text-gray-400 hover:text-red-400" />
            </button>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto max-w-full custom-scrollbar-hidden"
        >
          {files.slice(1).map((item, idx) => (
            <div className="relative flex-shrink-0" key={idx}>
              <img
                src={URL.createObjectURL(item)}
                alt={`Preview ${item?.name}`}
                className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md cursor-pointer"
              />
              <button
                onClick={() => handleDelete(idx + 1)}
                className="absolute top-2 right-2 p-1 rounded-md text-white hover:bg-customGray focus:outline-none focus:ring"
              >
                <RxCross1 className="text-[12px] text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ))}

          {imagesData?.map((file, index) => (
            <div key={index} className="relative flex-shrink-0">
              <img
                src={`data:image/png;base64,${base64Url[index]}`}
                alt={`Preview`}
                className="w-[112px] h-[112px] object-cover border-2 border-sky-400 rounded-md cursor-pointer"
              />
              <button
                onClick={() => handleDeleteAttachment(file)}
                className="absolute top-2 right-2 p-1 rounded-md text-white hover:bg-customGray focus:outline-none focus:ring"
              >
                <RxCross1 className="text-[12px] text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[2px] top-1/2 -translate-y-1/2">
        <button className="text-[24px] text-gray-400" onClick={handleNext}>
          <RiArrowRightDoubleFill />
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
