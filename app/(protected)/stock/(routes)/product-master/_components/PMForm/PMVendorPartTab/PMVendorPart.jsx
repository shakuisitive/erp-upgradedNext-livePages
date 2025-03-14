import React, { useState } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { useDispatch, useSelector } from "react-redux";
import AddVendor from "./customComponents/AddVendor";
import EditVendor from "./customComponents/EditVendor";
import EditCode from "./customComponents/EditCode";
import CustMoreOption from "../PMCustomerPartTab/customComponents/CustMoreOption";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import { closeModal } from "../../../redux/pmSlice";

const PMVendorPart = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const dispatch = useDispatch();
  const partNameOverride = useSelector(
    (state) => state.pmSlices.partNameOverride
  );
  const venList = partNameOverride.filter((item) => item.VEN_ID !== null);
  const [row, setRow] = useState([]);
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Vendor",
      slector: "",
      customComp: EditVendor,
      Wid: 150,
    },
    {
      title: "Vendor Part",
      slector: "",
      customComp: EditCode,
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
  const onKeyPress = (event) => {
    if (event.key == "x") {
      event.preventDefault();
      dispatch(closeModal());
    }
  };

  useKeyPress(["x"], onKeyPress);
  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative border lgdesktop:w-[100%] desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-1 w-full bg-gray-100"></div>
        <GridTable
          head={head}
          row={venList}
          setHead={setHead}
          GridTitle="Vendor Part"
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={true}
          GriddFooterAdd={AddVendor}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          MoreOption={CustMoreOption}
          MoreOpt={CustMoreOption}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default PMVendorPart;
