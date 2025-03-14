import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  IoIosArrowDown,
  IoIosRemoveCircleOutline,
  IoMdAdd,
} from "react-icons/io";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setIssueStatus } from "../../redux/Purchase.slice";

const PurchaseFormEmail = ({
  setIsDrawer,
  isDrawer,
  handleSkipEmailIssuOrder,
}) => {
  const [emailSubject, setEmailSubject] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [ccEmails, setCcEmails] = useState([]);
  const [emailBody, setEmailBody] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);
  const tooltipRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch()

  const purchaseOrderDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );

  const token = localStorage.getItem("tokenSession");

  const emailUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}EmailEngine/SendEmailByPowerShell`;

  const handleSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleToEmailChange = (e) => {
    setToEmail(e.target.value);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const removeAttachment = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleCcEmailChange = (e) => {
    const value = e.target.value;
    const lastChar = value.charAt(value.length - 1);
    if (lastChar === "\n" && validateEmail(value.slice(0, -1))) {
      setCcEmails([...ccEmails, value.slice(0, -1)]);
      e.target.value = "";
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && validateEmail(e.target.value)) {
      setCcEmails([...ccEmails, e.target.value]);
      e.target.value = "";
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRemoveCcEmail = (index) => {
    setCcEmails(ccEmails.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const getAllTaskPOrder = (data) => {
    if(data) {
      dispatch(setIssueStatus());
    }
  };


  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1];
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  const getFileDetails = async (selectedFiles) => {
    const fileDetails = [];

    for (const file of selectedFiles) {
      const base64data = await readFileAsBase64(file);
      fileDetails.push({
        name: file.name,
        base64: base64data,
      });
    }

    return fileDetails;
  };

  useEffect(() => {
   const fileDetFun = async() => {
    const fileDetail = await getFileDetails(selectedFiles);
    setFileDetails(fileDetail)
   }
   fileDetFun()
  },[selectedFiles])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      data: {
        SOURCEOR: purchaseOrderDetails?.VEN_ID,
        EmailAddressFrom: fromEmail || purchaseOrderDetails?.EMAIL,
        EmailAddresses: purchaseOrderDetails?.EMAIL || "",
        subject: emailSubject || "",
        body: emailBody || "",
        mailAttachments: fileDetails?.map((file) => file.name).join(",") || '',
        isBodyHtml: true,
        USEID: "",
        EmailCC: ccEmails.join(",") || purchaseOrderDetails?.EMAIL,
        fileBase64: fileDetails?.map((file) => file.base64).join(",") || '',
      },
      action: "System",
      method: "SendEmailByPowerShell",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    // Send the request
    sendRequest(emailUrl, "POST", payload, getAllTaskPOrder, token);
    
  };
 

  return (
    <div className="relative bg-white h-full flex flex-col gap-[24px] overflow-auto">
      <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-3 mt-4">
          
          <div className=" relative items-center mb-4">
            <div
              className="mr-3  flex pl-3 w-[120px] cursor-pointer justify-between rounded-md bg-[#0073EA] "
            >
              <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle  ">
              <button type="sumit">Send Email</button>
              </div>
              <div className="text-white flex items-center px-2 cursor-pointer "  onClick={() => setIsOpen(!isOpen)}>
                <IoIosArrowDown className="text-[18px] " />
              </div>
            </div>
            {isOpen && (
              <div
                ref={tooltipRef}
                className="absolute mt-2 w-[170px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
              >
                <div className="flex flex-col items-center">                 
                  <div className="cursor-pointer flex items-center my-2 gap-4  py-1 pl-2 w-full text-customblack hover:bg-customLightGray">
                    <IoIosRemoveCircleOutline />
                    <span onClick={handleSkipEmailIssuOrder}>Skip Email</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mr-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFilesChange}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="flex items-center py-[8px] px-[7px] text-customblack text-[14px] border border-gray-400 rounded-[4px] hover:bg-customGray"
              onClick={handleAttachmentClick}
            >
              <IoMdAdd className="mr-1 text-[20px]" />
              Add file
            </button>
            </div>
        </div>

        <div className="w-full flex items-start gap-[47px] ">
          <span className="text-[14px]">To:</span>
          <input
            type="email"
            name="EmailAddresses"
            placeholder="Please Enter Email"
            value={toEmail || purchaseOrderDetails?.EMAIL}
            onChange={handleToEmailChange}
            className="w-full bg-white border  py-2 border-gray-300  text-[14px] outline-none px-2 mr-2"
          />
        </div>

        <div className="flex w-full items-start gap-[28px]  ">
          <span className="text-[14px]">Copy:</span>
          <div className="w-full flex flex-wrap py-2 bg-white border border-gray-300 mr-2">
            <div className=" flex ">
              {ccEmails?.map((email, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-800 rounded-md  px-2  flex items-center"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleRemoveCcEmail(index)}
                  >
                    <RxCross1 />
                  </button>
                </div>
              ))}
            </div>
            <input
              defaultValue={ccEmails.join(",") || purchaseOrderDetails?.EMAIL}
              type="email"
              name="EmailCC"
              // value={}
              placeholder="Enter email "
              onKeyPress={handleInputKeyPress}
              onChange={handleCcEmailChange}
              className="w-fit bg-white px-[6px] ml-1 mr-2 text-[14px] outline-none "
            />
          </div>
        </div>

        <div className="flex items-start gap-3 ">
          <span className="text-[14px]">Subject:</span>
          <input
            type="text"
            name="subject"
            value={emailSubject}
            onChange={handleSubjectChange}
            placeholder="Please Enter Subject"
            className="w-full py-2 bg-white border border-gray-300  px-2 mr-2   text-[14px] outline-none "
          />
        </div>

        <div className="flex items-start gap-[42px] ">
        <span className="text-[14px]">File:</span>
            <div className="w-full flex flex-wrap py-5 bg-white border border-gray-300 mr-2">
              {selectedFiles.map((file, index) => (
                <div className="rounded-md bg-[#F5F7FB] py-2 px-4" key={index}>
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-xs font-normal text-[#07074D]">
                      {
                       file.name 
                      }
                    </span>
                    <button className="text-[#07074D]" onClick={() => removeAttachment(index)}>
                    <RxCross1 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        <div className="flex items-start gap-[30px] ">
          <span className="text-[14px]">Body:</span>
          <textarea
            name="body"
            value={emailBody}
            onChange={handleBodyChange}
            placeholder="Please Enter Body"
            className="w-full  px-2 mr-2 h-28 py-1 bg-white border border-gray-300 text-[14px] outline-none "
          />
        </div>
      </form>
    </div>
  );
};

export default PurchaseFormEmail;
