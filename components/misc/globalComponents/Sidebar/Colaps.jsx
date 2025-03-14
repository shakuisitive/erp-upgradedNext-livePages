import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";

import { PageClickedCheck } from "../../../../redux/slidebar/slidebar.slice";
import Link from "next/link";

const Colaps = ({ mouseEvntState, toggleCollapse, ListState, List, title }) => {
  const dispatch = useDispatch();

  const slectedSection = useSelector((state) => state.mouseEvnt.slectedSection);

  return (
    <div
      className={`p-4 pl-0 pt-0 pb-0 pr-0 w-full transition-all duration-300 cursor-pointer  `}
    >
      <div className={`flex justify-between w-full  `}>
        <p
          className={`font-bold text-[14px]  ${
            ListState == true ? "text-gray-500" : "text-gray-500"
          } `}
        >
          {title}
        </p>{" "}
        <RiArrowDropDownLine className="text-[25px] " />
      </div>

      <div
        className={`mt-0 rounded overflow-auto transition-all duration-1000 ${
          ListState ? "max-h-0" : "max-h-96"
        }`}
      >
        <div className="flex flex-col    text-gray-500">
          {List?.map((data, i) => {
            const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
            const formattedData = data.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                href={`/${formattedTitle}/${formattedData}`}
                key={i}
                onClick={() =>
                  dispatch(PageClickedCheck({ section: title, page: i }))
                }
                className={`my-3 hover:text-indigo-500 hover:bg-indigo-100  py-1 px-2 rounded-md text-sm font-medium ${
                  slectedSection.page == i && slectedSection.section == title
                    ? "bg-indigo-100 text-indigo-500"
                    : ""
                } `}
              >
                {data}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Colaps;
