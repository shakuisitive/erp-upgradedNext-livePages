import React, { useEffect, useState } from "react";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import PromotionRight from "./Header/PromotionRight";
import PromotionLeft from "./Header/PromotionLeft";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../_redux/promotionSlice";
import { setDate } from "date-fns";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const PromotionForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [promoId, setPromoId] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [sku, setSku] = useState("");
  const [promoName, setPromoName] = useState("");
  const [desc, setDesc] = useState("");
  const [promoPriority, setPromoPriority] = useState(1);
  const [promoType, setPromoType] = useState("");
  const [promoPercent, setPromoPercent] = useState("");
  const [promoAmount, setPromoAmount] = useState("");
  const [active, setActive] = useState(true);

  const [custType, setCustType] = useState("prepaid");
  const [allCust, setAllCust] = useState("no");
  // const assignCust = ;
  const [assignCust, setAssignCust] = useState("");
  const [assignCustName, setAssignCustName] = useState("");
  const [purgroId, setPurgroId] = useState("");
  const [lot, setLot] = useState("");
  const [minQty, setMinQty] = useState(1);
  const [maxQty, setMaxQty] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const promoEditDetForm = useSelector(
    (state) => state.promotionSlice.promoEditDetForm
  );
  const promoEditDetFormLot = useSelector(
    (state) => state.promotionSlice.promoEditDetFormLot
  );
  const ALL_MASS_CUSTOMERS_FLAG =
    promoEditDetForm?.ALL_MASS_CUSTOMERS_FLAG === "Y"
      ? "mass"
      : promoEditDetForm?.ALL_MASS_CUSTOMERS_FLAG === "N"
      ? "prepaid"
      : "prepaid";
  const ALL_CUSTOMERS_FLAG =
    promoEditDetForm?.ALL_CUSTOMERS_FLAG === "Y"
      ? "yes"
      : promoEditDetForm?.ALL_CUSTOMERS_FLAG === "N"
      ? "no"
      : "no";
  const ACTIVE =
    promoEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : promoEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const payload = {
    PROMO_ID: promoId,
    PAR_ID: sku,
    NAME: promoName,
    ACTIVE_FLAG: active ? "Y" : "N",
    CODE: promoCode,
    DESCRIPTION: desc,
    PURGRO_ID: purgroId,
    PROMO_START_DATE: dateFrom,
    PROMO_END_DATE: dateTo,
    MINIMUM_QUANTITY: minQty ? minQty : 1,
    MAXIMUM_QUANTITY: maxQty,
    PROMO_BASED_ON: promoType ? promoType : "PERCENT",
    PROMO_PERCENTAGE: promoPercent,
    PROMO_VALUE: promoAmount,
    PROMO_PRIORITY: promoPriority ? promoPriority : 1,
    PARTIAL_FLAG: "Y",
    MASS_CUSTOMER_FLAG:
      custType === "mass" ? "Y" : custType === "prepaid" ? "N" : null,

    INVPARLOT_ID: lot,
    CUSTOMER_BASED_FLAG:
      allCust === "yes" ? "Y" : allCust === "no" ? "N" : null,
    CUS_ID: assignCust,
    UNLIMITED_TIME_FLAG: "N",
    USE_ID: "2694",
  };
  const payloadPostPromo = {
    data: payload,

    action: "Administration",
    method: "PostPromotions",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostpromo = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.PAR_ID != "" &&
      payload?.PAR_ID != undefined
    ) {
      sendRequest(
        Administration.PostPromotions,
        "POST",
        payloadPostPromo,
        handlePostpromo,
        Token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (promoEditDetForm) {
      setPromoId(promoEditDetForm?.PROMO_ID);
      setPromoCode(promoEditDetForm?.PROMO_CODE);
      setPromoName(promoEditDetForm?.NAME);
      setMinQty(promoEditDetForm?.MINIMUM_QUANTITY);
      setMaxQty(promoEditDetForm?.MAXIMUM_QUANTITY);
      setPromoAmount(promoEditDetForm?.PROMO_VALUE);
      setPromoPercent(promoEditDetForm?.PROMO_PERCENTAGE);
      setPromoPriority(promoEditDetForm?.PROMO_PRIORITY);
      if (promoEditDetForm?.ASSIGNED_CUS_IDS) {
        setAssignCust(promoEditDetForm?.ASSIGNED_CUS_IDS);
      }
      setAssignCustName(promoEditDetForm?.ASSIGNED_CUSTOMERS);
      setSku(promoEditDetForm?.PAR_ID);
      setPurgroId(promoEditDetForm?.PURGRO_ID);
      setDesc(promoEditDetForm?.DESCRIPTION);
      setDesc(promoEditDetForm?.DESCRIPTION);
      setDateFrom(promoEditDetForm?.PROMO_START_DATE);
      setDateTo(promoEditDetForm?.PROMO_END_DATE);
      setPromoType(promoEditDetForm?.PROMO_BASED_ON);
      setActive(ACTIVE);
      setCustType(ALL_MASS_CUSTOMERS_FLAG);
      setAllCust(ALL_CUSTOMERS_FLAG);
    }
  }, [promoEditDetForm]);

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
                Info & Condition
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex  px-4 mr-2 gap-4  ">
                  <div className="w-1/2 ">
                    <PromotionLeft
                      active={active}
                      setActive={setActive}
                      promoCode={promoCode}
                      setPromoCode={setPromoCode}
                      promoName={promoName}
                      setPromoName={setPromoName}
                      desc={desc}
                      setDesc={setDesc}
                      promoPriority={promoPriority}
                      setPromoPriority={setPromoPriority}
                      promoType={promoType}
                      setPromoType={setPromoType}
                      promoPercent={promoPercent}
                      setPromoPercent={setPromoPercent}
                      promoAmount={promoAmount}
                      setPromoAmount={setPromoAmount}
                      sku={sku}
                      setSku={setSku}
                      isError={isError}
                      setIsError={setIsError}
                    />
                  </div>

                  <div className="w-1/2 ">
                    <PromotionRight
                      sku={sku}
                      custType={custType}
                      setCustType={setCustType}
                      allCust={allCust}
                      setAllCust={setAllCust}
                      assignCustName={assignCustName}
                      assignCust={assignCust}
                      setAssignCust={setAssignCust}
                      purgroId={purgroId}
                      setPurgroId={setPurgroId}
                      lot={lot}
                      setLot={setLot}
                      minQty={minQty}
                      setMinQty={setMinQty}
                      maxQty={maxQty}
                      setMaxQty={setMaxQty}
                      dateTo={dateTo}
                      setDateTo={setDateTo}
                      dateFrom={dateFrom}
                      setDateFrom={setDateFrom}
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

export default PromotionForm;
