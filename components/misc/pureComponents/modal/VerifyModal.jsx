import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const VerifyModal = ({ isOpen, onClose, msg, action, cancle, verify }) => {
  //   if (!isOpen) return null;

  return (
    <div
      id="modelConfirm"
      className="fixed  z-[10000] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
    >
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-lg">
        <div className="flex justify-end p-1">
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <IoClose />
          </button>
        </div>
        <div className="p-3 pt-0 text-center">
          <h3 className="text-xl font-normal text-gray-500 text-[20px] mt-1 mb-3">
            {msg}
          </h3>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              {cancle}
            </button>
            <button
              onClick={action}
              className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              data-modal-toggle="delete-user-modal"
            >
              {verify}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;
