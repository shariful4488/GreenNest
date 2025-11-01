import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError("Length must be at least 6 characters");
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Must have an Uppercase letter in the password");
    } else if (!/[a-z]/.test(value)) {
      setPasswordError("Must have a Lowercase letter in the password");
    } else {
      setPasswordError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (name.trim().length < 3) {
      setNameError("Name must be at least 3 characters long");
      return;
    } else {
      setNameError("");
    }


    try {
      const result = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      navigate("/");
    } catch (err) {
      setSubmitError(err.message || "Registration failed");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setSubmitError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 pt-18 px-3">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register Your <span className="text-green-400">GreenNest</span>
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Name"
            required
          />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}

          {/* Photo */}
          <label className="label">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Email"
            required
          />

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}

          {submitError && <p className="text-red-500 text-sm mt-3">{submitError}</p>}

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="btn bg-white text-black border-[#e5e5e5] mt-4 w-full flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Register with Google
          </button>

          <p className="font-semibold text-center pt-5 text-sm">
            Already have an account?{" "}
            <Link className="text-green-600 hover:underline" to="/auth/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
