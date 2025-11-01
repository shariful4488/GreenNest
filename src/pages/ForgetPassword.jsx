import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");

      window.open("https://mail.google.com/mail/u/0/#search/in%3Aspam", "_blank");

      toast.info("Check your Gmail (Spam/Promotions folder if not visible)");
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <ToastContainer />
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleReset} className="card-body px-0">
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-neutral w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner"></span>
                Redirecting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <p className="font-semibold text-center pt-4 text-sm">
            Remember your password?{" "}
            <Link className="text-green-600 hover:underline" to="/auth/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
