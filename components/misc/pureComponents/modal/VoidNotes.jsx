"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import TextArea from './../textinput/TextArea';

function VoidNotes({ setOpen, heading, onVoid }) {
  const [notes, setNotes] = useState("");

  const handleInputChangeNotes = (e) => {
    setNotes(e.target.value);
  };

  const postVoid = () => {
    onVoid(notes)
    setOpen(false)
  };

  return (
    <div className="fixed inset-0 z-30 bg-gray-50 backdrop-blur-sm backdrop-filter bg-opacity-50 opacity-100 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-[90vw] h-auto mx-auto my-6 border border-gray-200 rounded-lg">
        <div className="bg-white p-4 rounded-md shadow-lg ">
          <div className="flex items-start justify-between border-b-[1px] border-gray-300 ">
            <h3 className="poppins text-customblack text-[24px] leading-[30px]">
              {heading}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={postVoid}
                className=" bg-customgreen hover:bg-btnHoverGreen text-sm text-white border p-2 mr-2 border-gray-200 rounded-[4px] "
              >
                Continue
              </button>
              <button
                className="flex-col text-gray-600 hover:bg-customGray rounded-md"
                onClick={() => setOpen(false)}
              >
                <RxCross1 className="p-2 text-4xl " />
              </button>
            </div>
          </div>
          <div className="h-[40vh]">
            <TextArea
              label="Comments"
              initialValue=""
              onChange={handleInputChangeNotes}
              value={notes}
              placeHolder="Comments"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoidNotes;
