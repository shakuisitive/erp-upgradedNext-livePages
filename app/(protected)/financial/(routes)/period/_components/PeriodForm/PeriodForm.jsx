import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import PeriodRightForm from "./PeriodRightForm";
import PeriodLeftForm from "./PeriodLeftForm";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";

const PeriodForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [fiscalYear, setfiscalYear] = useState("");
  const [startDate, setstartDate] = useState("");
  const [closingDate, setclosingDate] = useState("");
  const [endDate, setendDate] = useState("");

  const [periodActive, setperiodActive] = useState(true);
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const venEditDetForm = useSelector(
    (state) => state.supplierSlice.venEditDetForm
  );
  const ACTIVE =
    venEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : venEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const payload = {
    NAME: fiscalYear,
    FY_END_DATE: endDate,
    FY_START_DATE: startDate,
    COUNTRY: "",
    ADDRESS_2: startDate,
    POSTAL_CODE: "",
    PHONE_2: "",
    FAX_1: "",
    PROVINCE: "",
    FY_CLOSING_DATE: closingDate,
    ACTIVE_FLAG: periodActive ? "Y" : "N",
  };
  const payloadPostSupplier = {
    data: payload,
    action: "Administration",
    method: "PostSuppliers",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostSupplier = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    if (
      payload?.FY_START_DATE != "" &&
      payload?.FY_START_DATE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.FY_END_DATE != "" &&
      payload?.FY_END_DATE!= undefined &&
      payload?.FY_CLOSING_DATE != "" &&
      payload?.FY_CLOSING_DATE != undefined
    ) {
      sendRequest(
        Administration.PostSuppliers,
        "POST",
        payloadPostSupplier,
        handlePostSupplier,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (venEditDetForm) {
      setfiscalYear(venEditDetForm?.NAME);
      setstartDate(venEditDetForm?.FY_START_DATE);
      setclosingDate(venEditDetForm?.FY_CLOSING_DATE);
      setendDate(venEditDetForm?.FY_END_DATE);
    }
  }, [venEditDetForm]);
  return (
    <div className="h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
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
                <div className="flex  px-4 mr-2 gap-4  ">
                  <div className="w-1/2 ">
                    <PeriodLeftForm
                      fiscalYear={fiscalYear}
                      setfiscalYear={setfiscalYear}
                      startDate={startDate}
                      setstartDate={setstartDate}
                      endDate={endDate}
                      setendDate={setendDate}
                      isError={isError}
                      setIsError={setIsError}
                      closingDate={closingDate}
                      setClosingDate={setclosingDate}
                    />
                  </div>
                  <div className="w-1/2 ">
                    <PeriodRightForm
                      periodActive={periodActive}
                      setperiodActive={setperiodActive}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )} */}
    </div>
  );
};

export default PeriodForm;
