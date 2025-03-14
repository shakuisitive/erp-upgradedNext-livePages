import React, { useEffect, useRef, useState } from "react";
import GridTable from "../../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import PMGridMoreOption from "../../../PMGridMoreOption";
import CustomScrollBar from "../../../../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import PMKitGridFooterAdd from "./pmKitGridComponents/PMKitGridFooterAdd";
import PMKitLotNum from "./pmKitGridComponents/PMKitLotNum";
import PMKitPurchaseG from "./pmKitGridComponents/PMKitPurchaseG";
import PMKitQty from "./pmKitGridComponents/PMKitQty";
import PMExpiryDate from "./pmKitGridComponents/PMExpiryDate";
import PMAvlQty from "./pmKitGridComponents/PMAvlQty";
import { useSelector } from "react-redux";

const PMKitGrid = () => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [colaps, setColaps] = useState(false);
  const addKitItem = useSelector((state) => state.pmSlices.addKitItem);
  const kitSubGrid = useSelector((state) => state.pmSlices.kitSubGrid);
  //   const editKitDetForm = useSelector((state) => state.pmSlices.editKitDetForm);
  //   console.log("option check not redux", addKitItem);
  const [head, sethead] = useState([
    { title: "SKU", slector: "PAR_CODE", Wid: 220 },
    { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 150 },
    { title: "Description", slector: "DESCRIPTION", Wid: 200 },
    {
      title: "PG",
      slector: "PURCHASE_GROUP",
      customComp: PMKitPurchaseG,
      Wid: 150,
    },
    {
      title: "Lot",
      slector: "ASSIGNED_LOTS",
      customComp: PMKitLotNum,
      Wid: 150,
    },
    { title: "Expiry", slector: "EXPIRY", Wid: 150, customComp: PMExpiryDate },
    { title: "OH QTY", slector: "OH_QTY_LOT", Wid: 150 },
    { title: "AV QTY", slector: "AVL_QTY_LOT", Wid: 150, customComp: PMAvlQty },
    {
      title: "Kit QTY",
      slector: "QUANTITY",
      customComp: PMKitQty,
      Wid: 150,
    },
    { title: "Cost", slector: "STANDARD_COST", Wid: 150 },
    { title: "Price", slector: "PRICE", Wid: 150 },
  ]);

  const [scrollChange, setScrollChange] = useState(1);

  const activeGridRef = useRef(null);
  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {};
  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  useEffect(() => {
    const container = activeGridRef.current;

    const handleOverflowChange = (entries) => {
      setScrollChange((pre) => pre + 1);
    };
    const resizeObserver = new ResizeObserver(handleOverflowChange);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full justify-between overflow-auto bg-white mb-2 rounded-t-md">
      <CustomScrollBar change={scrollChange} refsArray={[activeGridRef]}>
        <div
          ref={activeGridRef}
          className={` overflow-x-hidden   mt-1 h-fit mr- `}
        >
          <GridTable
            head={head}
            row={kitSubGrid}
            sethead={sethead}
            GridTitle="Items"
            GridColor="#4ade80"
            GridColaps={false}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfuncComp}
            addButton={true}
            isChecked={checked}
            handleCheckboxChange={handleCheckboxChange}
            selectedRow={selectedRow}
            GriddFooterAdd={PMKitGridFooterAdd}
            MoreOpt={PMGridMoreOption}
            checkBoxShow={false}
            // setEdite={setEdite}
            // setHActive={setHActive}
            // hActive={hActive}
          />
        </div>
      </CustomScrollBar>
    </div>
  );
};

export default PMKitGrid;
{
  /* <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
        <div className="">
          
        </div>
      </div> */
}
