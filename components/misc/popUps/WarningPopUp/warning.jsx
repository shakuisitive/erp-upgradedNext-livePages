import { PiWarningDiamondLight } from "react-icons/pi";
function WarningAlert() {
    return (
        <div>
                <div className='text-center py-6'>
                <PiWarningDiamondLight className="text-yellow-400 mx-auto text-7xl" />
                    <h2 className='text-yellow-400 font-bold uppercase py-6 text-3xl'> Warning!</h2>
                    <p className=' text-xs text-center py-6'>Hold on! Your data doesnot matches.</p>
                </div>
            </div>
    )
}
export default WarningAlert;