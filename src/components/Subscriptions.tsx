
import { IoStar } from "react-icons/io5";
import GradientButton from "./GradientButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Subscriptions = () => {
  return (
    <div className='subscription-bg w-[305px] min-h-[160px] py-6 px-12 flex flex-col gap-2.5 rounded-r-2xl '>
        <h4 className='flex justify-start items-start gap-1 text-xl font-medium text-white'> <span><IoStar className='w-6 h-6 text-[#FFBE0A]'/></span> Premium</h4>
        <p className='text-[16px] font-medium text-white'>We have subscription, 
Do you want to subscribe?</p>
        <div className="pt-1">
            <GradientButton
            text="Subscribe Now"
            icon={<IoMdCheckmarkCircleOutline />}
            onClick={() => alert("Clicked!")}
        />
        </div>
    </div>
  )
}

export default Subscriptions