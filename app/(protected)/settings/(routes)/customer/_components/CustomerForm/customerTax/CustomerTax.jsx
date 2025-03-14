import React from "react";
import { useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import AddTax from "./customComponents/AddTax";
import EditTax from "./customComponents/EditTax";
import { useSelector } from "react-redux";
import CustomerMoreOption from "../../CustomerMoreOption";
const CustomerTax = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const taxDetails = useSelector((state) => state.customerSlice.taxDetails);
  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Tax",
      slector: "CODE",
      customComp: EditTax,
      Wid: 150,
    },
    {
      title: "Rate",
      slector: "TAX_PERCENTAGE_RATE",
      //   customComp: Message,
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
          row={taxDetails}
          setHead={setHead}
          GridTitle="Tax"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddTax}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          MoreOption={CustomerMoreOption}
          MoreOpt={CustomerMoreOption}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default CustomerTax;
