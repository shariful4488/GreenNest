import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser({ displayName: name, photoURL });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        My Profile
      </h1>

      <div className="flex flex-col items-center gap-4 bg-green-50 p-6 rounded-lg shadow">
        <img
          src={
            photoURL ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-green-600"
        />

        {/* User Info */}
        <div className="text-center mt-2">
          <h2 className="text-xl font-semibold text-green-700">
            {user?.displayName || "Unknown User"}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Profile Update Form */}
        <form className="w-full mt-6 flex flex-col gap-4" onSubmit={handleUpdate}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
