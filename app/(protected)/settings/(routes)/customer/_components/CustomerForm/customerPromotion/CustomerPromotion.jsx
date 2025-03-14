import React from "react";
import { useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import PromoValue from "./customComponents/PromoValue";
import PromoMinMax from "./customComponents/PromoMinMax";
import AddPromo from "./customComponents/AddPromo";
import PromoMoreOption from "./customComponents/PromoMoreOption";
import { useSelector } from "react-redux";

const CustomerPromotion = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const promoDetails = useSelector((state) => state.customerSlice.promoDetails);
  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Promo Name",
      slector: "NAME",
      //   customComp: DateandTime,
      Wid: 150,
    },

    {
      title: "Customer Name",
      slector: "CUSTOMER_NAME",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Promo Start",
      slector: "PROMO_START_DATE",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Promo End",
      slector: "PROMO_END_DATE",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Group",
      slector: "PURCHASE_GROUP",
      //   customComp: Message,
      Wid: 120,
    },
    {
      title: "Promo",
      slector: "PROMO_VALUE",
      customComp: PromoValue,
      Wid: 120,
    },
    {
      title: "Min/Max",
      slector: "MINIMUM_QUANTITY",
      customComp: PromoMinMax,
      Wid: 120,
    },
  ]);
  const colapsfunc = () => {
    setColaps(!colaps);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && !checkedAll) {
      setCheckedAll(true);
      const data = row.Result.map((SData, i) => {
        return { rowI: i, rowData: SData };
      });
      setCheckedItems(data);
    } else if (rowData == "all" && checkedAll) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI || item.rowData !== rowData
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={() => {}} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <GridTable
          head={head}
          row={promoDetails}
          setHead={setHead}
          GridTitle="Promotion"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddPromo}
          isChecked={checked}
          checkBoxShow={false}
          MoreOption={PromoMoreOption}
          MoreOpt={PromoMoreOption}
          moreOptShow={false}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default CustomerPromotion;
