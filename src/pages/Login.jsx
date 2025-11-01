import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setEmailError("");
    setPasswordError("");
    setError("");

    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Enter a valid email address");
    if (!password) return setPasswordError("Password is required");
    if (!validatePassword(password)) return setPasswordError("Password must be at least 6 characters");

    try {
      await loginUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Login to <span className="text-green-400">GreenNest</span>
        </h2>
        <form onSubmit={handleLogin} className="card-body px-0">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full mb-1"
            placeholder="Email"
          />
          {emailError && <p className="text-red-500 text-xs mb-2">{emailError}</p>}

          <label className="label">Password</label>
          <div className="relative mb-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="text-red-500 text-xs mb-2">{passwordError}</p>}
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <div className="mb-2 text-right">
            <Link to="/auth/forget-password" className="link link-hover text-sm">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-neutral w-full mt-2">
            Login
          </button>

          <p className="font-semibold text-center pt-4 text-sm">
            Don’t have an account?{" "}
            <Link className="text-green-600" to="/auth/register">
              Register
            </Link>
          </p>

          <div className="flex items-center justify-center mt-4">
            <div className="w-1/4 border-t"></div>
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <div className="w-1/4 border-t"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 border mt-4 py-2 rounded hover:bg-gray-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
