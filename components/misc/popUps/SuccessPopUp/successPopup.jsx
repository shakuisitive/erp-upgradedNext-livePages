import { FiCheckCircle } from "react-icons/fi";
function SuccessAlert() {
    return (
        <div>
                <div className='text-center py-6'>
                <FiCheckCircle className="text-green-400 mx-auto text-7xl" />
                    <h2 className='text-green-400 font-bold uppercase py-6 text-3xl'> Success!</h2>
                    <p className='text-xs text-center py-6'>Congrats! Your order has been confirmed!</p>
                </div>
        </div>
    )
}
export default SuccessAlert;