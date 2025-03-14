"use client";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BsViewList } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GridCheckFilter({ options }) {
  const [filterFields, setFilterFields] = useState([
    { slect: "", text: "", nextCondition: "" },
  ]);

  // console.log("filter check", filterFields);
  const setCheck = (index, nextCondition) => {
    const lnth = filterFields.length - 1;
    console.log("log lenth", lnth);
    console.log("log index", index);
    if (lnth === index) {
      setFilterFields((prev) => [
        ...prev,
        { slect: "", text: "", nextCondition },
      ]);
      // console.log("filter check", filterFields);
    }
    if (index < filterFields.length) {
      let newFilterFields = [...filterFields];
      let num = index + 1;
      newFilterFields[num] = {
        ...newFilterFields[num],
        nextCondition: nextCondition,
      };
      setFilterFields(newFilterFields);
    }
    // else if (index < filterFields.length) {
    //  let   num = index + 1
    //     filterFields[num].nextCondition = nextCondition;
    //   }
  };

  const handleChangeText = (index, e) => {
    console.log("handle chage text", index, e.target.value);
    let newFilterFields = [...filterFields];
    newFilterFields[index] = {
      ...newFilterFields[index],
      nextCondition: nextCondition,
    };
    setFilterFields(newFilterFields);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          <BsViewList className="text-[18px] " />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt- w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          {filterFields.map((data, index) => {
            let num = index + 1;

            return (
              <div key={index} className="py-1 ">
                <div>
                  <div
                    className={classNames(
                      "   hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm"
                    )}
                  >
                    <div className="w-full border-b mb-2 pb-2">
                      <p>Filter</p>
                    </div>
                    <div
                      className="w-full outline-none mb-2  rounded-sm "
                      name=""
                      id=""
                    >
                      {options?.map((data, i) => {
                        return (
                          // <li selected value="Contain">{data}</li>
                          <div key={i} className="my-1">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-gray-500" htmlFor="">
                              {data}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
