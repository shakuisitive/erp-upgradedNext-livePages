import react from 'react'

const SaveButton = ({ onClick, label }) => {
    return (
        <button
            className="bg-green-200 hover:bg-green-400 hover:text-white font-semibold text-green-600 py-2 px-4 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default SaveButton;

// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <SaveButton label="Cancel" onClick={handleClick}/>