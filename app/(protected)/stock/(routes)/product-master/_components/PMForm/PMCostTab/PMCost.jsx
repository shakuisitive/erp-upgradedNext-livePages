import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PMCostLeft from "./Header/PMCostLeft";
import PMCostRight from "./Header/PMCostRight";
import { setVenid } from "../../../../purchase/redux/Purchase.slice";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import { setAccessFlag } from "../../../../../../settings/(routes)/customer/_redux/customerSlice";
import Loading from "../../../../../../../../components/misc/loader/loading";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import { closeModal } from "../../../redux/pmSlice";
const PMCost = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [lCostProjected, setLCostProjected] = useState("");
  const [lCostCurrent, setLCostCurrent] = useState("");
  const [eDateCurrent, setEDateCurrent] = useState("");
  const [eDateProjected, setEDateProjected] = useState("");
  const [otherChargesCurrent, setOtherChargesCurrent] = useState("");
  const [otherChargesProjected, setOtherChargesProjected] = useState("");
  const [unitCostCurrent, setUnitCostCurrent] = useState("");
  const [unitCostProjected, setUnitCostProjected] = useState("");
  const [source, setSource] = useState("");
  const [currency, setCurrency] = useState("");
  const [country, setCountry] = useState("");
  const [uomId, setUomId] = useState("");
  const [conversion, setConversion] = useState("");
  const [replenishment, setReplenishment] = useState("");
  const [lastCost, setLastCost] = useState(null);
  const [averageCost, setAverageCost] = useState(null);
  const [standeredCost, setStanderedCost] = useState(null);
  const [note, setNote] = useState("");
  const [isLocal, setIsLocal] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [htCodeCurrent, setHtCodeCurrent] = useState("");
  const [htCodeProjected, setHtCodeProjected] = useState("");
  const [venIdCurrent, setVenIdCurrent] = useState("");
  const [venIdProjected, setVenIdProjected] = useState("");
  const [isError, setIsError] = useState(false);
  const [responseData, setResponseData] = useState(null);

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);

  const costPayload = {
    data: {
      PAR_COST_ID: responseData ? responseData : "",
      CODE: "Cruise Ship Cost",
      NAME: "Cruise Ship Cost",
      HT_CODE_ID_CURRENT: htCodeCurrent,
      HT_CODE_ID_PREFERED: htCodeProjected,
      VEN_ID_PREFERED_CURRENT: venIdCurrent,
      VEN_ID_PREFERED_PROJECTED: venIdProjected,
      UNIT_COST_CURRENT: unitCostCurrent,
      UNIT_COST_PROJECTED: unitCostProjected,
      LANDED_COST_CURRENT_ID: lCostCurrent,
      LANDED_COST_PROJECTED_ID: lCostProjected,
      EFFECTIVE_DATE_CURRENT: eDateCurrent,
      EFFECTIVE_DATE_PROJECTED: eDateProjected,
      OTHER_CHARGES_CURRENT: otherChargesCurrent,
      OTHER_CHARGES_PROJECTED: otherChargesProjected,
      SOURCE: isLocal ? "Local" : isInternational ? "International" : "",
      CURRENCY: currency,
      COUNTRY: country,
      LAST_ORDER_QTY: "",
      UOM_ID: uomId,
      REPLENISHMENT: replenishment,
      CONVERSION: conversion,
      LAST_VEN_ID: "",
      LAST_COST: lastCost,
      AVERAGE_COST: averageCost,
      STANDARD_COST: standeredCost,
      GLACC_ID: "",
      ACTIVE_FLAG: "Y",
      par_id: editDetForm?.PAR_ID,
      NOTES: note,
      GLACCGRO_ID: "",
    },
    action: "Administration",
    method: "PostPartCost",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  let getCostPayload = {
    data: {
      PAR_ID: editDetForm?.PAR_ID,
    },
    action: "Administration",
    method: "GetPartCost",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetPartCostData = (data) => {
    if (data.CODE == "SUCCESS") {
      const getSource = (status) => {
        switch (status) {
          case "Local":
            return setIsLocal(true);
          case "International":
            return setIsInternational(true);
          default:
            return "";
        }
      };

      const resData = data.Result[0];
      setResponseData(resData?.PAR_COST_ID);
      setHtCodeCurrent(resData?.HT_CODE_ID_CURRENT);
      setHtCodeProjected(resData?.HT_CODE_ID_PROJECTED);
      setVenIdCurrent(resData?.VEN_ID_PREFERED_CURRENT);
      setVenIdProjected(resData?.VEN_ID_PREFERED_PROJECTED);
      setUnitCostCurrent(resData?.UNIT_COST_CURRENT);
      setUnitCostProjected(resData?.UNIT_COST_PROJECTED);
      setLCostCurrent(resData?.LANDED_COST_CURRENT_ID);
      setLCostProjected(resData?.LANDED_COST_PROJECTED_ID);
      setEDateCurrent(resData?.EFFECTIVE_DATE_CURRENT);
      setEDateProjected(resData?.EFFECTIVE_DATE_PROJECTED);
      setOtherChargesCurrent(resData?.OTHER_CHARGES_CURRENT);
      setOtherChargesProjected(resData?.OTHER_CHARGES_CURRENT);
      getSource(resData?.COST_SOURCE);
      setCurrency(resData?.COST_CURRENCY);
      setCountry(resData?.COST_COUNTRY);
      setUomId(resData?.COST_UOM_ID);
      setReplenishment(resData?.REPLENISHMENT);
      setConversion(resData?.CONVERSION);
      setLastCost(resData?.LAST_COST);
      setAverageCost(resData?.AVERAGE_COST);
      setStanderedCost(resData?.STANDARD_COST);
      setNote(resData?.COST_NOTES);
    }
  };

  useEffect(() => {
    if (editDetForm?.PAR_ID) {
      sendRequest(
        Administration.GetPartCost,
        "POST",
        getCostPayload,
        handleGetPartCostData,
        token
      );
    }
  }, [editDetForm]);

  const handlePostData = (data) => {};

  const handleFetchCostData = () => {
    if (
      (isLocal || isInternational) &&
      htCodeCurrent != "" &&
      htCodeCurrent != undefined &&
      htCodeProjected != "" &&
      htCodeProjected != undefined &&
      unitCostCurrent != "" &&
      unitCostCurrent != undefined &&
      unitCostProjected != "" &&
      unitCostProjected != undefined
    ) {
      sendRequest(
        Administration.PostPartCost,
        "POST",
        costPayload,
        handlePostData,
        token
      );
    } else {
      setIsError(true);
    }
  };
  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["x"], onKeyPress);
  return (
    <>
      {responseData == "" && <Loading />}
      <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
        <div
          className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
        rounded-md bg-white  "
        >
          <div className="py-2 ml-[50px]">
            <DropdownMenu
              label="Apply"
              handleClick={handleFetchCostData}
              // options={options}
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
            />
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
                  <div className="flex flex-col lg:flex-row  px-4 mr-2 gap-4  ">
                    <div className="w-full lg:w-1/2 ">
                      <PMCostLeft
                        unitCostCurrent={unitCostCurrent}
                        setUnitCostCurrent={setUnitCostCurrent}
                        unitCostProjected={unitCostProjected}
                        setUnitCostProjected={setUnitCostProjected}
                        eDateCurrent={eDateCurrent}
                        setEDateCurrent={setEDateCurrent}
                        eDateProjected={eDateProjected}
                        setEDateProjected={setEDateProjected}
                        otherChargesCurrent={otherChargesCurrent}
                        setOtherChargesCurrent={setOtherChargesCurrent}
                        otherChargesProjected={otherChargesProjected}
                        setOtherChargesProjected={setOtherChargesProjected}
                        htCodeCurrent={htCodeCurrent}
                        setHtCodeCurrent={setHtCodeCurrent}
                        htCodeProjected={htCodeProjected}
                        setHtCodeProjected={setHtCodeProjected}
                        venIdCurrent={venIdCurrent}
                        setVenIdCurrent={setVenIdCurrent}
                        venIdProjected={venIdProjected}
                        setVenIdProjected={setVenIdProjected}
                        lCostCurrent={lCostCurrent}
                        setLCostCurrent={setLCostCurrent}
                        lCostProjected={lCostProjected}
                        setLCostProjected={setLCostProjected}
                        isError={isError}
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <PMCostRight
                        uomId={uomId}
                        setUomId={setUomId}
                        currency={currency}
                        setCurrency={setCurrency}
                        conversion={conversion}
                        setConversion={setConversion}
                        replenishment={replenishment}
                        setReplenishment={setReplenishment}
                        averageCost={averageCost}
                        setAverageCost={setAverageCost}
                        standeredCost={standeredCost}
                        setStanderedCost={setStanderedCost}
                        lastCost={lastCost}
                        setLastCost={setLastCost}
                        note={note}
                        setNote={setNote}
                        isLocal={isLocal}
                        setIsLocal={setIsLocal}
                        isInternational={isInternational}
                        setIsInternational={setIsInternational}
                        country={country}
                        setCountry={setCountry}
                        isError={isError}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PMCost;
