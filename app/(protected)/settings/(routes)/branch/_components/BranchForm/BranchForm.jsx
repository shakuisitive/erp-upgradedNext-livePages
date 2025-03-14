import React, { useEffect, useState } from "react";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import BranchLeft from "./Header/BranchLeft";
import BranchRight from "./Header/BranchRight";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeModal } from "../../_redux/branchSlice";

const BranchForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [locId, setLocId] = useState("");

  const [locCode, setLocCode] = useState("");
  const [tenId, setTenId] = useState("");
  const [branchManager, setBranchManager] = useState("");
  const [branchName, setBranchName] = useState("");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [active, setActive] = useState(true);
  const [postal, setPostal] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("CA");
  const [countryName, setCountryName] = useState("Canada");

  let [error, sendRequest] = useApiFetch();
  const locEditDetForm = useSelector(
    (state) => state.branchSlice.locEditDetForm
  );
  const ACTIVE =
    locEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : locEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  function toCamelCase(str) {
    return str?.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }
  const provinceLower = toCamelCase(locEditDetForm?.PROVINCE);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const payload = {
    LOC_ID: locId,
    TEN_ID: tenId,
    CODE: locCode,
    BRANCH_NAME: branchName,
    ADDRESS: address1,
    EMAIL: email,
    PHONE: phone,
    ACTIVE_FLAG: active ? "Y" : "N",
    PROSTA_ID: "",
    POSTAL_CODE: postal,
    ADDRESS_2: address2,
    CITY: city,
    COUNTRY: countryName,
    PROVINCE: province,
    NOTES: notes,
    BRANCH_MANAGER_NAME: branchManager,
  };
  const payloadPostLocation = {
    data: payload,
    action: "Administration",
    method: "PostLocations",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostLocation = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.TEN_ID != "" &&
      payload?.TEN_ID != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.BRANCH_MANAGER_NAME != "" &&
      payload?.BRANCH_MANAGER_NAME != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined &&
      payload?.PROVINCE != "" &&
      payload?.PROVINCE != undefined &&
      payload?.EMAIL != "" &&
      payload?.EMAIL != undefined &&
      payload?.PHONE != "" &&
      payload?.PHONE != undefined &&
      payload?.ADDRESS != "" &&
      payload?.ADDRESS != undefined
    ) {
      sendRequest(
        Administration.PostLocations,
        "POST",
        payloadPostLocation,
        handlePostLocation,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };
  useEffect(() => {
    if (locEditDetForm) {
      setLocId(locEditDetForm?.LOC_ID);
      setLocCode(locEditDetForm?.CODE);
      setBranchName(locEditDetForm?.BRANCH_NAME);
      setBranchManager(locEditDetForm?.BRANCH_MANAGER_NAME);
      setEmail(locEditDetForm?.EMAIL);
      setPhone(locEditDetForm?.PHONE);
      setTenId(locEditDetForm?.TEN_ID);
      setAddress1(locEditDetForm?.ADDRESS_1);
      setAddress2(locEditDetForm?.ADDRESS_2);
      setCity(locEditDetForm?.CITY);
      setProvince(provinceLower);

      if (locEditDetForm?.COUNTRY == "Canada") {
        setCountry("CA");
      }
      if (locEditDetForm?.COUNTRY == "United States") {
        setCountry("US");
        // setProvince(locEditDetForm?.PROVINCE);
      }
      setCountryName(locEditDetForm?.COUNTRY);
      setNotes(locEditDetForm?.NOTES);
      setPostal(locEditDetForm?.POSTAL_CODE);
      setActive(ACTIVE);
    }
  }, [locEditDetForm]);
  console.log("checking", provinceLower);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex  rounded-lg">
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
                <div className="flex  px-4 mr-2 gap-4  ">
                  <div className="w-1/2 ">
                    <BranchLeft
                      locCode={locCode}
                      setLocCode={setLocCode}
                      branchName={branchName}
                      setBranchName={setBranchName}
                      branchManager={branchManager}
                      setBranchManager={setBranchManager}
                      tenId={tenId}
                      setTenId={setTenId}
                      phone={phone}
                      setPhone={setPhone}
                      email={email}
                      setEmail={setEmail}
                      notes={notes}
                      setNotes={setNotes}
                      isError={isError}
                      setIsError={setIsError}
                    />
                  </div>
                  <div className="w-1/2 ">
                    <BranchRight
                      address1={address1}
                      setAddress1={setAddress1}
                      address2={address2}
                      setAddress2={setAddress2}
                      active={active}
                      setActive={setActive}
                      postal={postal}
                      setPostal={setPostal}
                      city={city}
                      setCity={setCity}
                      country={country}
                      setCountry={setCountry}
                      province={province}
                      setProvince={setProvince}
                      setCountryName={setCountryName}
                      isError={isError}
                      setIsError={setIsError}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default BranchForm;
