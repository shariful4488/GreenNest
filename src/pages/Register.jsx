import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, signInWithGoogle, updateUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const displayName = e.target.name.value.trim();
    const photoURL = e.target.photo.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!displayName) return setError("Please enter your name.");
    if (!email) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");
    if (!/[A-Z]/.test(password))
      return setError("Password must include at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      return setError("Password must include at least one lowercase letter.");
    if (!/\d/.test(password))
      return setError("Password must include at least one number.");

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName, photoURL })
          .then(() => {
            toast.success("Account created successfully!");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already registered!");
        } else if (error.code === "auth/weak-password") {
          setError("Password should be at least 6 characters.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed up with Google successfully!");
        navigate("/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 pt-16 px-3">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-5">
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register Your <span className="text-green-400">GreenNest</span>
        </h2>

        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
          />

          <label className="label">Photo URL</label>
          <input
            name="photo"
            type="text"
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />

          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Email Address"
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
