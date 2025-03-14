import shirtOne from "../../../../../../public/shirt-1.png";
import Image from "next/image";

const ProductList = () => {
  return (
    <table className="w-full px-3 border-collapse">
      <thead className="py-2 ">
        <tr>
          <th className="text-xs text-gray-400 font-medium text-left">ITEM</th>
          <th className="text-xs text-gray-400 font-medium text-center">QTY</th>
          <th className="text-xs text-gray-400 font-medium text-center">
            PRICE
          </th>
          <th className="text-xs text-gray-400 font-medium text-center">
            PRICE
          </th>
          <th className="text-xs text-gray-400 font-medium text-center">
            TOTAL PRICE
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[1, 2, 3].map((item, index) => (
          <tr key={index} className="text-sm text-gray-700">
            <td className="py-4 border-b">
              <div className="flex items-center gap-2">
                <Image src={shirtOne} alt="product-1" width={30} height={30} />
                <div className="flex flex-col">
                  <p className="m-0 text-xs font-medium text-gray-600">
                    Elephant 1801
                  </p>
                  <small className="text-xs font-semibold text-gray-400">
                    Item: XDG-2347
                  </small>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b text-center font-medium">
              x1
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b text-center font-medium">
              $72.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b text-center font-medium">
              -$20.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b text-center font-medium">
              $200.00
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
