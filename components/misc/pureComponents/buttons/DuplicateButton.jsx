import react from 'react'

const DuplicateButton = ({ onClick, label }) => {
    return (
        <button
            className="bg-emerald-200 hover:bg-emerald-400 text-emerald-600 hover:text-white font-semibold  py-2 px-4 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default DuplicateButton;

// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <DuplicateButton label="Cancel" onClick={handleClick}/>