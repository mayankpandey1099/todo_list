import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { setAuthenticated, setToken} from "../../utils/AuthSlice";
import {
  setModalStateSignin,
  setModalStateSignup,
} from "../../utils/ModalSlice";


const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModalSignin);
  const navigate = useNavigate();



  const handleSignIn = async () => {
    setLoading(true);
    const signInData = { email, password };


    try {
      
      const response = await axios.post(
        "http://localhost:3000/sign/login",
        signInData
      );

      const token = response.data.token;

      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setModalStateSignin(false));
        
      navigate("/");
    
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Password does not match. Please try again.");
      } else if (error.response && error.response.status === 404) {
        alert("User not found. Please signin with registered email");
      } else {
        console.error("Error signing in:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = ()=>{
    dispatch(setModalStateSignup(true));

  }


  const handleCloseModal = () => {
    dispatch(setModalStateSignin(false));
  };


  return (
    showModal && (
      <div className="fixed top-40 bottom-40 left-0 right-0 flex justify-center items-center backdrop-blur-sm">
        <div className="relative p-4 w-full max-w-md ">
          <div className="relative bg-white shadow rounded-lg">
            <div
              className="flex items-center justify-between p-4 border-b rounded-t"
              style={{ backgroundColor: "#0766AD" }}
            >
              <h3 className="text-xl font-semibold text-gray-100">
                Sign in to our platform
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-100 hover:text-gray-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4" style={{ backgroundColor: "#F3F3F3" }}>
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <Link
                    to="/forgotpassword"
                    className="text-sm text-blue-700 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleSignIn}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login to your account"}
                </button>
                <div className="text-sm font-medium text-gray-500">
                  <button className="text-blue-500 hover:underline" onClick={handleSignup}>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Signin;
