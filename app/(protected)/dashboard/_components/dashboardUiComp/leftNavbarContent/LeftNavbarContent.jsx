import Link from "next/link";
import { useRouter } from "next/router";

const data = [
  {
    title: "Product Master",
    letter: "PM",
    path: "/stock/product-master",
  },
  {
    title: "Purchase Order",
    letter: "PO",
    path: "/stock/purchase",
  },
  {
    title: "Receiving Order",
    letter: "RO",
    path: "/stock/receiving",
  },
  {
    title: "Stock Order",
    letter: "SO",
    path: "/stock/stock-order",
  },
];

const LeftNavbarContent = () => {
  return (
    <div className="text-balck flex flex-wrap md:flex-nowrap  md:flex-col pt-4 items-start gap-5">
      {data?.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="flex items-center gap-4 cursor-pointer"
        >
          <span className="w-[35px] h-[35px] rounded-md flex items-center bg-blue-600 text-white justify-center">
            {item.letter}
          </span>
          <div className="flex flex-col gap-1 items-start">
            <p className="m-0 text-xs font-medium">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeftNavbarContent;
