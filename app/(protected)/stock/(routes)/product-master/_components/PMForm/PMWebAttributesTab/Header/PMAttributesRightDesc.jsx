import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CustomToolbar = () => (
  <div
    id="custom-toolbar"
    className="bg-white !border-[#82b7ec] rounded-t-[8px] !border-r-[2px] !border-l-[2px] !border-b-[#c3c6d4] !border-t-[2px]"
  >
    <select className="ql-header">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="">Normal</option>
    </select>
    <button className="ql-bold">Bold</button>
    <button className="ql-italic">Italic</button>
    <button className="ql-image">Image</button>
    <button className="ql-list" value="ordered">
      Ordered List
    </button>
    <button className="ql-list" value="bullet">
      Bullet List
    </button>
    <button className="ql-link">Link</button>
    <select className="ql-font">
      <option value="serif">Serif</option>
      <option value="sans-serif">Sans Serif</option>
    </select>
    <select className="ql-size">
      <option value="10px">10px</option>
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
      <option value="36px">36px</option>
      <option value="50px">50px</option>
      <option value="">Normal</option>
    </select>
    <select className="ql-color">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="orange">Orange</option>
      <option value="#A6CE39">Light Green</option>
      <option value="#0477BE">Dark Blue</option>
      <option value="">Default</option>
    </select>
  </div>
);

const PMAttributesRightDesc = ({
  value,
  onChange,
  placeholder = "Write your description here...",
}) => {
  // const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content) => {
    onChange(content);

    // setEditorValue(content);

    // }
  };

  return (
    <div className="h-full">
      <CustomToolbar />
      <ReactQuill
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        modules={PMAttributesRightDesc.modules}
        formats={PMAttributesRightDesc.formats}
        className="h-[120px] border-[#82b7ec] text-customblack border-r rounded-md border-l border-b bg-white"
      />
    </div>
  );
};

PMAttributesRightDesc.modules = {
  toolbar: {
    container: "#custom-toolbar",
  },
};

PMAttributesRightDesc.formats = [
  "header",
  "font",
  "size",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "align",
  "link",
  "image",
  "color",
];

export default PMAttributesRightDesc;
