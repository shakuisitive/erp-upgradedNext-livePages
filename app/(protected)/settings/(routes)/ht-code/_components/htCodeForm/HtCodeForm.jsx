import React, { useEffect, useState } from "react";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import HtCodeLeft from "./header/HtCodeLeft";
import HtCodeRight from "./header/HtCodeRight";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeEditModal, setRefreshing } from "../../_redux/htCodeSlice";

const HtCodeForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [transportFee, setTransportFee] = useState("");
  const [lcCode, setLcCode] = useState("");
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(true);
  const [forex, setForex] = useState("");
  const [htId, setHtId] = useState("");
  const [overheads, setOverheads] = useState("");

  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const htCodeFormData = useSelector(
    (state) => state.htCodeSlice.htCodeFormData
  );
  const ACTIVE =
    htCodeFormData?.ACTIVE_FLAG === "Y"
      ? true
      : htCodeFormData?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const payload = {
    HT_CODE_ID: htId,
    CODE: code,
    NAME: name,
    DESCRIPTION: desc,
    DUTY_LC_CODE: lcCode,
    FOREX: forex,
    TRANSPORATION_FEE: transportFee,
    OVERHEADS: overheads,
    NOTES: notes,
    ACTIVE_FLAG: active ? "Y" : "N",
  };
  const payloadCustomer = {
    data: payload,
    action: "Administration",
    method: "PostHarmonizedTarrifCode",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleCustomer = (data) => {
    dispatch(setRefreshing(true));

    if (data?.CODE === "SUCCESS") {
      dispatch(closeEditModal());
    }
  };
  const handleApply = () => {
    // console.log("payload", payloadCustomer);
    sendRequest(
      Administration.PostHarmonizedTarrifCode,
      "POST",
      payloadCustomer,
      handleCustomer,
      token
    );
  };

  useEffect(() => {
    if (htCodeFormData) {
      setHtId(htCodeFormData?.HT_CODE_ID);
      setCode(htCodeFormData?.CODE);
      setDesc(htCodeFormData?.DESCRIPTION);
      setForex(htCodeFormData?.FOREX);
      setNotes(htCodeFormData?.NOTES);
      setName(htCodeFormData?.NAME);
      setOverheads(htCodeFormData?.OVERHEADS);
      setTransportFee(htCodeFormData?.TRANSPORATION_FEE);
      setLcCode(htCodeFormData?.DUTY_LC_CODE);
      setActive(ACTIVE);
    }
  }, [htCodeFormData]);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
            <div className="ml-[50px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <HtCodeLeft
                      code={code}
                      setCode={setCode}
                      name={name}
                      setName={setName}
                      desc={desc}
                      setDesc={setDesc}
                      notes={notes}
                      setNotes={setNotes}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <HtCodeRight
                      active={active}
                      setActive={setActive}
                      forex={forex}
                      setForex={setForex}
                      overheads={overheads}
                      setOverheads={setOverheads}
                      lcCode={lcCode}
                      setLcCode={setLcCode}
                      transportFee={transportFee}
                      setTransportFee={setTransportFee}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default HtCodeForm;
