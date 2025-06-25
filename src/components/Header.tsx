import LanguageDropdown from "./LanguageDropdown.tsx";
import Button from "./Button.tsx";
import NotificationButton from "./NotificationButton.tsx";
import MenuBar from "./MenuBar.tsx";
import { Link } from "react-router-dom";
// import CartDropdown from './CartDropdown.tsx'
const Header = () => {
  const notifications = ["New message from John", "Your order has been shipped","update account"]; // Example notifications

  return (
    <header className=" sticky top-0 z-20  w-full flex justify-between items-center p-5 xl:px-12 xl:py-10 backdrop-blur-xl backdrop-grayscale ">
      {/* Menu bar */}
      <div className="flex-1 flex justify-start items-center">
        <MenuBar variant="left" width="w-64" isDisabled={true}/>
      </div>
      <div className="flex-1 flex justify-center items-center">
         <Link to="/" aria-label="Go to Home Page">
         <img className=" cursor-pointer"
            src="/images/logo.svg" 
            alt="logo"/>
         </Link>
      </div>
      <div className="flex-1 flex justify-end items-center gap-3">
        {/* for future use */}
        {/* <div className="">
          <CartDropdown />
        </div> */}
        {/* notification  */}
        <div className="hidden sm:block">
        <NotificationButton notifications={notifications} isDropdownDisabled={true}/>
        </div>
        {/* language dropdown-menu  */}
        <div className="hidden md:block">
          <LanguageDropdown  isDropdownDisabled={false}/>
        </div>
        {/* logout button  */}
        <div className="">
        <Button
            text="Logout"
            className="bg-(--button-bg-color) text-sm font-medium capitalize"
            onClick={() => console.log("Logout clicked")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 