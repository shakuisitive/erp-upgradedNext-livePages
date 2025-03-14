import react from 'react'

const ReportButton = ({ onClick, label }) => {
    return (
        <button
            className="bg-amber-200 hover:bg-amber-400 text-amber-600 hover:text-white font-semibold py-2 px-4 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default ReportButton;

// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <ReportButton label="Cancel" onClick={handleClick}/>