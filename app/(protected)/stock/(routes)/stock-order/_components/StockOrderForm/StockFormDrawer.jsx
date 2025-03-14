import React, { useState , useEffect } from 'react'
import NewButton from '../../../../../../../components/misc/pureComponents/buttons/NewButton'
import StockOrderFormHeader from './StockOrderFormHeader';
import GridTable from '../../../../../../../components/misc/pureComponents/GridTable/GridTable';

const StockFormDrawer = () => {
  const [data, setData] = useState();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  function getAllTask(data) {
    setData(data);
    // console.log("this is data in inner grid", data.Result.Table1);
    setErrorM(error);
  }

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };
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
  const [head, sethead] = useState([
    { title: "", slector: "", Wid: 220 },
    { title: "Date Time", slector: "DateTime", Wid: 220 },
    { title: "Message", slector: "Message", Wid: 450 },
    { title: "User", slector: "User", Wid: 250 },
  ]);

  const [row, setRow] = useState([
    {
      DateTime: "04/18/2024",
      Message: "Stock Order has been created from Receiving: REC000473",
      User: "admin",
    },
    {
      DateTime: "04/18/2024",
      Message: "Stock Order has been created from Receiving: REC000473",
      User: "admin",
    },
  ]);

  return (
    <div>
      <div className="flex w-full justify-between bg-white mb-2 rounded-t-md">
      <div className="  flex   ">
       {/* <NewButton label="Transfer"/> */}
      </div>
      <StockOrderFormHeader/>
    </div>
    
    <div className="">
        
        <GridTable
        head={head}
        row={row}
        sethead={sethead}
        GridTitle="Activity"
        GridColor="green-400"
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfuncComp}
        addButton={false}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        selectedRow={selectedRow}
      />
    </div>
      </div>

      
  )
}

export default StockFormDrawer
