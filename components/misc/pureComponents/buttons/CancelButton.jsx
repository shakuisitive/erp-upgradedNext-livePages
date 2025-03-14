import react from "react";

const CancelButton = ({ onClick, label }) => {
  return (
    <button
      className="bg-red-200 font-semibold hover:bg-red-400 text-red-500 hover:text-white py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CancelButton;

// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// ********************Method to call************
// <CancelButton label="Cancel" onClick={handleClick}/>
