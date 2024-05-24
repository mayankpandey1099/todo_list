import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAuthenticated, setToken } from "../../utils/AuthSlice.js";
import { setModalStateSignup } from "../../utils/ModalSlice.js";
import { useNavigate } from "react-router-dom";




const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = useSelector((state) => state.modal.showModalSignup);
 
  const validatePassword = () => {
    return password === repassword;
  };

  const handleSignUp = async () => {
    if (!validatePassword()) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);

    const signupData = { name, email, password };
    try {
      
      
      const response = await axios.post(
        "http://localhost:3000/sign/signup",
        signupData
      );

      const token = response.data.token;


      dispatch(setAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setModalStateSignup(false));

      navigate("/");
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Email is already registered. Please sign in with that email.");
      } else {
        alert("An error occurred while signing up. Please try again later.");
      }
    } finally{
        setLoading(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(setModalStateSignup(false));
  };

  return (
    showModal && (
      <div
        id="authentication-modal"
        className="fixed top-40 bottom-40 left-0 right-0 flex justify-center items-center backdrop-blur-sm"
      >
        <div className="relative p-4 w-full max-w-md">
          <div className="relative bg-white rounded-lg shadow">
            <div
              className="flex items-center justify-between p-4 border-b rounded-t"
              style={{ backgroundColor: "#0766AD" }}
            >
              <h3 className="text-xl font-semibold text-gray-100">
                Sign up for an account
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Email
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
                    Your Password
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
                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  disabled={loading}
                >
                  {loading ? "Signing you up..." : "Signup"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Signup;
