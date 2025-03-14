import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PMPriceLeft from "./Header/PMPriceLeft";
import PMPriceRight from "./Header/PMPriceRight";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import PMPriceQtyDisc from "./PMPriceQtyDisc";
import StepQuantityADiscount from "../PMPriceTab/Header/StepQuantityADiscount";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../../../../components/misc/loader/loading";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import { closeModal } from "../../../redux/pmSlice";

const PMPrice = ({ onClose }) => {
  const [isHeader, setIsHeader] = useState(true);
  const [isStep, setIsStep] = useState(true);
  const [lPriceProjected, setLPriceProjected] = useState("");
  const [lPriceCurrent, setLPriceCurrent] = useState("");
  const [eDateCurrent, setEDateCurrent] = useState("");
  const [eDateProjected, setEDateProjected] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [standeredPrice, setStanderedPrice] = useState("");
  const [profitMCurrent, setProfitMCurrent] = useState("");
  const [profitMProjected, setProfitMProjected] = useState("");
  const [listPriceCurrent, setListPriceCurrent] = useState("");
  const [listPriceProjected, setListPriceProjected] = useState("");
  const [note, setNote] = useState("");
  const [responseData, setResponseData] = useState("");
  const [type, setType] = useState("");

  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const editDetForm = useSelector((state) => state.pmSlices.editDetForm);

  let pricePayload = {
    data: {
      PAR_PRICE_ID: responseData ? responseData : "",
      CODE: "001",
      NAME: "Manufacturer's Suggested Retail Price",
      LANDED_COST_CURRENT_ID: "",
      LANDED_COST_PROJECTED_ID: "",
      PROFIT_MARGIN_CURRENT: profitMCurrent,
      PROFIT_MARGIN_PROJECTED: profitMProjected,
      LIST_PRICE_CURRENT: listPriceCurrent,
      LIST_PRICE_PROJECTED: listPriceProjected,
      EFFECTIVE_DATE_CURRENT: eDateCurrent,
      EFFECTIVE_DATE_PROJECTED: eDateProjected,
      LAST_PRICE: lastPrice,
      AVERAGE_PRICE: averagePrice,
      STANDARD_PRICE: standeredPrice,
      GLACC_ID: "",
      NOTES: note,
      PAR_ID: editDetForm.PAR_ID,
      GLACCGRO_ID: "",
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "PostPartPrice",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const getPricePayload = {
    data: {
      PAR_ID: editDetForm.PAR_ID,
    },
    action: "Administration",
    method: "GetPartPrice",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handlePostPriceData = (data) => {
    if (data?.CODE == "SUCCESS" && type == "saveAndClose") {
      onClose();
    }
  };

  const handleApplyPrice = (typ) => {
    setType(typ);
    sendRequest(
      Administration.PostPartPrice,
      "POST",
      pricePayload,
      handlePostPriceData,
      token
    );
  };

  const handleGetPriceData = (data) => {
    if (data.CODE == "SUCCESS") {
      const resData = data?.Result[0];
      setResponseData(resData?.PAR_PRICE_ID);
      setProfitMCurrent(resData?.PROFIT_MARGIN_CURRENT);
      setProfitMProjected(resData?.PROFIT_MARGIN_PROJECTED);
      setListPriceCurrent(resData?.LIST_PRICE_CURRENT);
      setListPriceProjected(resData?.LIST_PRICE_PROJECTED);
      setEDateCurrent(resData?.EFFECTIVE_DATE_CURRENT);
      setEDateProjected(resData?.EFFECTIVE_DATE_PROJECTED);
      setLastPrice(resData?.LAST_PRICE);
      setAveragePrice(resData?.AVERAGE_PRICE);
      setStanderedPrice(resData?.STANDARD_PRICE);
      setNote(resData?.NOTES);
    }
  };
  useEffect(() => {
    if (editDetForm?.PAR_ID) {
      sendRequest(
        Administration.GetPartPrice,
        "POST",
        getPricePayload,
        handleGetPriceData,
        token
      );
    }
  }, [editDetForm]);

  useEffect(() => {
    setType("");
  }, []);

  const options = [
    {
      label: "Save",
      onClick: () => handleApplyPrice("save"),
    },
  ];
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
              handleClick={handleApplyPrice}
              options={options}
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
                  Information
                </button>
              </div>
              {isHeader && (
                <div className="ml-10 ">
                  <div className="flex flex-col lg:flex-row  px-4 mr-2 gap-4  ">
                    <div className="w-full lg:w-1/2 ">
                      <PMPriceLeft
                        eDateCurrent={eDateCurrent}
                        setEDateCurrent={setEDateCurrent}
                        eDateProjected={eDateProjected}
                        setEDateProjected={setEDateProjected}
                        profitMCurrent={profitMCurrent}
                        setProfitMCurrent={setProfitMCurrent}
                        profitMProjected={profitMProjected}
                        setProfitMProjected={setProfitMProjected}
                        lPriceCurrent={lPriceCurrent}
                        setLPriceCurrent={setLPriceCurrent}
                        lPriceProjected={lPriceProjected}
                        setLPriceProjected={setLPriceProjected}
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <PMPriceRight
                        lastPrice={lastPrice}
                        setLastPrice={setLastPrice}
                        averagePrice={averagePrice}
                        setAveragePrice={setAveragePrice}
                        standeredPrice={standeredPrice}
                        setStanderedPrice={setStanderedPrice}
                        note={note}
                        setNote={setNote}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="ml-[50px] my-4">
                <button
                  className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                  onClick={() => setIsStep((prev) => !prev)}
                >
                  {isStep ? (
                    <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                  ) : (
                    <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                  )}
                  Step Quantity & Discount
                </button>
              </div>
              {isStep && (
                <div className="ml-10 ">
                  <div className="flex flex-col lg:flex-row  px-4 mr-2 gap-4  ">
                    <PMPriceQtyDisc />
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

export default PMPrice;
