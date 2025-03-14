"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
// import {setEditorData} from "../../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";
import { setEditorData } from "../../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";
import "react-quill/dist/quill.snow.css";
import { UseDispatch, useDispatch } from "react-redux";

// const CustomButton = () => <span className="octicon octicon-star" />;

const CustomToolbar = ({ toolid, func, reference }) => (
  <div
    id={`${toolid}`}
    className="bg-white !border-[#82b7ec] rounded-t-[8px] !border-r-[2px] !border-l-[2px] !border-b-[#c3c6d4] !border-t-[2px]"
  >
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="" selected>
        Normal
      </option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>

    <button
      className={`${
        toolid == "ContentId" ||
        toolid == "detailTitle" ||
        toolid == "ContentIdblockFourTitle" ||
        toolid == "ContentIdblockSixTitle" ||
        toolid == "ContentIdblockSixTitle"
          ? "hidden"
          : "ql-image"
      }`}
    ></button>
    <button className="ql-list" value="ordered">
      li
    </button>
    <button className="ql-list" value="bullet">
      lib
    </button>

    <button className="ql-link"></button>
    <select className="ql-font"></select>
    <select className="ql-size"></select>
    <select className="ql-size">
      <option value="10px">10px</option>
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
      <option value="36px">36px</option>
      <option value="50px">50px</option>
      <option value="" selected>
        Normal
      </option>
    </select>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="#A6CE39"></option>
      <option value="#0477BE"></option>
      <option selected></option>
    </select>

    {/* <button className="ql-insertStar">
            <CustomButton />
        </button> */}

    <button
      style={{
        marginLeft: "50px",
        backgroundColor: "#0477BE",
        color: "white",
        width: "fit-content",
        textAlign: "center",
        borderRadius: "0.375rem",
        padding: "0px 8px",
        display: "inline-block",
      }}
      onClick={() =>
        func(
          reference.current.getEditor().root.innerHTML,
          reference.current.getEditor().getText()
        )
      }
      className="ql-save hover:text-[#A6CE39]"
    >
      save
    </button>
    <button style={{ marginLeft: "20px", width: "fit-content" }}>cancel</button>
  </div>
);

const QuillEditor = ({ func, toolid, data }) => {
  const [value, setValue] = useState("");

  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (value) {
      dispatch(setEditorData(value));
    }
  }, [value]);
  useEffect(() => {
    setValue(data);
  }, [data]);

  Quill.modules = {
    toolbar: {
      container: `#${toolid}`,
      handlers: {
        insertStar: insertStar,
      },
    },
  };
  useEffect(() => {
    const fontSizeStyle = Quill.import("attributors/style/size");
    fontSizeStyle.whitelist = [
      "10px",
      "12px",
      "14px",
      "16px",
      "20px",
      "24px",
      "36px",
      "50px",
    ];
    Quill.register(fontSizeStyle, true);
  }, []);

  return (
    <div className="">
      <div className=" h-full">
        <CustomToolbar
          toolid={toolid}
          func={func}
          reference={ref}
          className=""
        />
        <ReactQuill
          ref={ref}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={Quill.modules}
          className="h-[120px] border-[#82b7ec] text-customblack border-r rounded-b-[8px] border-l border-b bg-white"
          placeholder="Write an update..."
        />
      </div>
    </div>
  );
};
const insertStar = () => {
  // Implement the logic for inserting a star
};

Quill.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export default QuillEditor;
