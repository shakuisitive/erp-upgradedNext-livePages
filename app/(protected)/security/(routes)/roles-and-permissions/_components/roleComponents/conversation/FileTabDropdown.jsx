import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {    
  IoIosExpand,
  IoIosMore,
  } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { GoDownload } from "react-icons/go";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center bg-white p-1 hover:bg-blue-300 text-customblack rounded-[4px] ">
          <IoIosMore/>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[180px] text-[14px] px-2 pt-2 origin-top-right rounded-[4px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div className="py-1">
            <Menu.Item>
              <div className="flex items-center gap-2 mb-3 hover:bg-gray-300 rounded-[4px] ">
                <IoIosExpand  className="text-[18px]" />
                Open File
              </div>
            </Menu.Item>
            <Menu.Item>
            <div className='flex items-center gap-2 mb-3 hover:bg-gray-300 rounded-[4px]'>
            <GoDownload className='text-[18px]' />
            Download File
          </div>
            </Menu.Item>
            <Menu.Item>
            <div className='flex items-center gap-2 mb-3 hover:bg-gray-300 rounded-[4px]'>
            <AiOutlineDelete className='text-[18px]' />

            Delete File
          </div>
            </Menu.Item>
            <Menu.Item>
            <div className='flex items-center gap-2 mb-3 hover:bg-gray-300 rounded-[4px]'>
            <FaRegComment className='text-[18px]' />
            Post Update on File
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

