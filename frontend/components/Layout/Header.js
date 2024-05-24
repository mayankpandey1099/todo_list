import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import { setModalStateSignin, setModalStateSignup } from "../../utils/ModalSlice";
import img1 from "../../public/img1.png";
import { toggleDrawer } from "../../utils/DrawerSlice";
import Drawer from "./Drawer";
import useRazorpay from "../hooks/useRazorpay";
import premium_img from "../../public/premium_img.png";


const Header = () => {
  //useClearToken();

  const isOpen = useSelector((state) => state.drawer.isOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const isPremium = useSelector((state) => state.auth.isPremium); 


  const dispatch = useDispatch();

  useEffect(() => {
  }, [isPremium, isAuthenticated]);


  const handleSignInClick = () => {
    dispatch(setModalStateSignin(true));
    dispatch(setModalStateSignup(false));
  };

  
  const handleSignUpClick = () => {
    dispatch(setModalStateSignup(true));
    dispatch(setModalStateSignin(false));
  };


  const handleToggleDrawer = () => {
    dispatch(toggleDrawer(!isOpen)); 
  };


  const handlePremium = useRazorpay()



  return (
    <div className="relative">
      <div
        className="flex justify-between bg-cyan-800 items-center px-8 py-10 text-white"
      >
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 overflow-hidden rounded-full shadow-lg">
            <img src={img1} alt="Logo" className="w-full h-auto bg-white" />
          </div>
          <span
            className="font-bold text-xl"
            style={{ fontFamily: "'Poetsen One', sans-serif" }}
          >
            Spend-Wise
          </span>
        </div>
        <div className="flex items-center">
          {isAuthenticated && (
            <>
              {isPremium ? (
                <div className="relative">
                  <div className="rounded-full bg-white p-1 mr-4 mb-2">
                    <img
                      src={premium_img}
                      alt="Premium"
                      className="w-14 h-15"
                      title="You are a premium user"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white text-black px-2 py-1 rounded-md shadow-md opacity-0 pointer-events-none transition-opacity duration-300">
                    You are a premium user
                  </div>
                </div>
              ) : (
                <button
                  className="text-white hover:bg-gray-700 focus:ring-0 font-bold rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  type="button"
                  onClick={handlePremium}
                >
                  Buy Premium
                </button>
              )}
              <button
                className="text-white hover:bg-gray-700 focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="button"
                onClick={handleToggleDrawer}
                data-drawer-target="drawer-right-example"
                data-drawer-show="drawer-right-example"
                data-drawer-placement="right"
                aria-controls="drawer-right-example"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <button
                className="mr-2 p-2 font-bold text-white rounded-lg"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
              <button
                className="mr-2 p-2 font-bold text-white rounded-lg"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen && <Drawer />}
    </div>
  );
};

export default Header;
