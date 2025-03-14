import React from "react";
import UseInput from "../../../../../../../components/misc/pureComponents/textinput/InputHook";
const NewSalesOrderTotal = () => {
  return (
    <div>
      <div className="grid grid-cols-[130px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Sub Total
        </label>
        <UseInput
          type="number"
          isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder=" Subtotal"
        />
      </div>
      <div className="grid grid-cols-[130px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Shipping
        </label>
        <UseInput
          type="number"
          //   isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder="Shipping"
        />
      </div>
      <div className="grid grid-cols-[130px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Tax
        </label>
        <UseInput
          type="number"
          //   isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder=" Tax"
        />
      </div>
      <div className="grid grid-cols-[130px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Total
        </label>
        <UseInput
          type="number"
          //   isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder="Total"
        />
      </div>
    </div>
  );
};

export default NewSalesOrderTotal;
