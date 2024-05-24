import React, { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const { uuid } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    setShowModal(true);
  }, []);

  const validatePassword = () => {
    return password === confirmPassword;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) {
       alert("Passwords do not match. Please check");
       return;
     }
    setLoading(true);
    
    try {
      const resetPasswordData = {uuid, password};
      const response = axios.post(
        "http://localhost:3000/pass/reset",
        resetPasswordData
      );

      setPassReset(true);

      setTimeout(() => {
        setPassReset(false);
        setShowModal(false);
        navigate("/signin");
      }, 3000);
    } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Link Expired. Please try again.");
        }else{
          console.error("Error resetting password:", error);
        } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page flex justify-center items-center h-screen bg-gray-200">
      <div className="p-8 rounded-lg shadow-xxl">
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center">
            <div className="relative w-full p-4 max-w-md">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Reset Your Password
                  </h3>
                </div>
                <div className="p-4">
                  {passReset ? ( 
                    <p className="text-green-600 mb-4">
                      Changing password. Please wait...
                    </p>
                  ) : (
                    <form className="space-y-4" action="#">
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Enter Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter your password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Re-enter Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="Re-enter your password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={handleResetPassword}
                          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                          disabled={loading}
                        >
                          {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
