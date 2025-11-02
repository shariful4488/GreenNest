import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const errors = [];
    if (value.length < 6) errors.push("Length must be at least 6 characters");
    if (!/[A-Z]/.test(value)) errors.push("Must have an Uppercase letter");
    if (!/[a-z]/.test(value)) errors.push("Must have a Lowercase letter");
    if (!/\d/.test(value)) errors.push("Must have a Number");
    setPasswordError(errors.join(", "));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitError("");

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name must be at least 5 characters long.");
      return;
    } else {
      setNameError("");
    }

    if (passwordError) return; 

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => navigate("/"))
          .catch(() => navigate("/"));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSubmitError("The email is already in use.");
        } else {
          setSubmitError(error.message);
        }
      });
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => setSubmitError(error.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 pt-16 px-3">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register Your <span className="text-green-400">GreenNest</span>
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input name="name" type="text" className="input input-bordered w-full" placeholder="Name" required />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}

          <label className="label">Photo URL</label>
          <input name="photo" type="text" className="input input-bordered w-full" placeholder="Photo URL" />

          <label className="label">Email</label>
          <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              onChange={handlePasswordChange}
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="btn mt-4 w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
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
