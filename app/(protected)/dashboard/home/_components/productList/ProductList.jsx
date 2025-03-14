import shirtOne from "../../../../../../public/media/dashboard/shirt-1.png";
import Image from "next/image";

const ProductList = () => {
  return (
    <table className="w-[97%] border-collapse md:px-[5px] md:ml-[10px]">
      <thead className="py-2 text-gray-400 font-medium lg:text-[12px] md:text-[10px] text-xs xl:text-sm lgdesktop:text-xl">
        <tr>
          <th className=" text-left">ITEM</th>
          <th className="text-center">QTY</th>
          <th className="text-center">PRICE</th>
          <th className="text-center">PRICE</th>
          <th className="text-center">TOTAL PRICE</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y  divide-gray-200">
        {[1, 2, 3].map((item, index) => (
          <tr key={index} className="text-sm text-gray-700  lgdesktop:text-2xl">
            <td className="py-4 md:py-[2px] border-b lgdesktop:p-[15px] lg:p-[10px] xl:p-[10px]">
              <div className="flex items-center gap-2">
                <div className="lgdesktop:w-[65px] lgdesktop:h-[65px] lg:w-[30px] lg:h-[30px]  xl:w-[40px] xl:h-[40px] md:h-[20px] md:w-[20px] h-[30px] w-[30px]">
                  <Image
                    src={shirtOne}
                    className="object-cover w-full h-full"
                    alt="product-1"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="m-0 text-xs md:text-[10px] 2xl:text-[16px] xl:text-sm lg:text-xs lgdesktop:text-lg font-semibold text-gray-700">
                    Elephant 1801
                  </p>
                  <small className="text-xs md:text-[10px] 2xl:text-[16px] xl:text-sm lg:text-xm lgdesktop:text-lg font-semibold text-gray-400">
                    Item: XDG-2347t
                  </small>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 md:px-[2px] 2xl:text-[16px] xl:text-sm lg:text-xs md:py-[2px] md:text-[10px] text-gray-700 lgdesktop:text-xl whitespace-nowrap border-b text-center font-semibold">
              x1
            </td>
            <td className="px-6 py-4 md:px-[2px] 2xl:text-[16px]  xl:text-sm lg:text-xs  md:py-[2px] md:text-[10px] text-gray-700 lgdesktop:text-xl whitespace-nowrap border-b text-center font-semibold">
              $72.00
            </td>
            <td className="px-6 py-4 md:px-[2px] 2xl:text-[16px] xl:text-sm lg:text-xs  md:py-[2px] md:text-[10px] text-gray-700 lgdesktop:text-xl  whitespace-nowrap border-b text-center font-semibold">
              -$20.00
            </td>
            <td className="px-6 py-4 md:px-[2px] 2xl:text-[16px] xl:text-sm lg:text-xs md:py-[2px] md:text-[10px] text-gray-700 lgdesktop:text-xl  whitespace-nowrap border-b text-center font-semibold">
              $200.00
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
