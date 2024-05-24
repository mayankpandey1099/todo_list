import React, { useState, useEffect } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

   useEffect(() => {
     setShowModal(true);
   }, []);


  const handleForgotPassword = async () => {
    setLoading(true);
    const userEmail = {email};
    try {
      const response = await axios.post(
        "http://localhost:3000/pass/forgot",
        userEmail
      );
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setShowModal(false);
      }, 180000);
      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Email id does not match. Please write the registered email.");
      } else {
        alert("An error occurred while sending mail. Please try again later.");
      }// Handle error here
    } finally{
        setLoading(false);
    }
  };

  return (
    <div className="signin-page flex justify-center items-center h-screen  bg-gray-200">
      <div className="p-8 rounded-lg shadow-xxl">
        {showModal && (
          <div className="fixed top-40 bottom-40 left-0 right-0 flex justify-center items-center ">
            <div className="relative w-full p-4 max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Forgot Password
                  </h3>
                </div>
                <div className="p-4">
                  {emailSent ? ( 
                    <p className="text-green-600 mb-4">
                      Please check your email and reset your password from
                      there.
                    </p>
                  ) : (
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
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                          disabled={loading}
                        >
                          {loading ? "Sending mail...." : "Reset"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
