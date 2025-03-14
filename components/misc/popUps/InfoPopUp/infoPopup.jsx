import { BsInfoCircle } from "react-icons/bs";
function InfoAlert() {
    return (
        <div>
                <div className='text-center py-6'>
                <BsInfoCircle className="text-blue-400 mx-auto text-7xl" />
                    <h2 className='text-blue-400 font-bold uppercase py-6 text-3xl'> Info!</h2>
                    <p className='text-xs text-center py-6'>Info! Are you sure, You want to confirm this order ?</p>
                </div>
            </div>
    )
}
export default InfoAlert;