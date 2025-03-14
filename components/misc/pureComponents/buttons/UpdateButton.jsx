import react from 'react'

const UpdateButton = ({ onClick, label }) => {
    return (
        <button
            className="bg-teal-200 hover:bg-teal-400 hover:text-white text-teal-600 font-semibold py-2 px-4 rounded"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default UpdateButton;



// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <UpdateButton label="Cancel" onClick={handleClick}/>