import React, { useEffect, useState } from "react";
import OptionSelector from "../../../../../../../../components/misc/pureComponents/optionselector/OptionSelector";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { useSelector } from "react-redux";

const CustomerFilter = ({ filterState, setFilterState, reset, setReset }) => {
  const purchaseGroup = useSelector(
    (state) => state.customerSlice.purchaseGroup
  );
  const [custType, setCustType] = useState("");
  const [statusArr, setStatusArr] = useState([
    { option: "Mass" },
    { option: "Prepaid" },
  ]);
  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        Cn: "",
        Ca: "",
        City: "",
        Pg: "",
        PgId: "",
        Ct: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);
  const setChangePg = (value) => {
    let pgId = "";
    purchaseGroup.forEach((item) => {
      if (item.CODE == value) {
        pgId = item.PURGRO_ID;
      }
    });
    const newState = { ...filterState, PgId: pgId, Pg: value };
    setFilterState(newState);
  };
  const setChangeCt = (value) => {
    setCustType(value);
    const CtValue = value === "Mass" ? "Y" : "N";

    const newState = { ...filterState, Ct: CtValue };
    setFilterState(newState);
  };
  const setChangeCa = (e) => {
    const newState = { ...filterState, Ca: e.target.value };
    setFilterState(newState);
  };
  const setChangeCn = (e) => {
    const newState = { ...filterState, Cn: e.target.value };
    setFilterState(newState);
  };
  const setChangeCity = (e) => {
    const newState = { ...filterState, City: e.target.value };
    setFilterState(newState);
  };
  return (
    <div className="grid grid-cols-3 gap-4 pb-12">
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <UseInput
          type="text"
          placeholder="Please Enter Name"
          value={filterState?.Cn}
          onChange={setChangeCn}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseInput
          type="text"
          placeholder="Please Enter Address"
          value={filterState?.Ca}
          onChange={setChangeCa}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseInput
          type="text"
          placeholder="Please Enter City"
          value={filterState?.City}
          onChange={setChangeCity}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <OptionSelector
          list={statusArr}
          onChangeFun={setChangeCt}
          selectedItem={custType}
          listName="Select Type"
          propertyName={"option"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={purchaseGroup}
          onChangeFun={setChangePg}
          selectedItem={filterState?.Pg}
          listName="Select Purchase Group"
          propertyName={"CODE"}
        />
      </div>
    </div>
  );
};

export default CustomerFilter;
