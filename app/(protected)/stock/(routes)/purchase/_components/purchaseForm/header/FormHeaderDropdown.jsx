import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {    IoIosArrowDown,
  IoIosArrowUp,
  IoIosMore,
  IoIosSearch, } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3  text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
          <IoIosMore
            className="-mr-1 h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 pl-3 pt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <div className="flex items-center gap-2 mb-3">
                <BiSortAlt2  className="text-[18px]" />
                Sort
              </div>
            </Menu.Item>
            <Menu.Item>
            <div className='flex items-center gap-2 mb-3'>
            <IoIosArrowDown className='text-[18px]' />
            Previous
          </div>
            </Menu.Item>
            <Menu.Item>
            <div className='flex items-center gap-2 mb-3'>
            <IoIosArrowUp className='text-[18px]' />
            Next
          </div>
            </Menu.Item>
            {/* <form method="POST" action="#">
              <Menu.Item>
              <div className='flex items-center gap-2 mb-3'>
            <BiSortAlt2 className='text-[18px]' />
            Sort
          </div>
              </Menu.Item>
            </form> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
