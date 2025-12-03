import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const AddService = () => {
  const { user } = useContext(AuthContext);

  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    location: "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Price field: allow only digits and dot
    if (name === "price") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setServiceData({ ...serviceData, [name]: value });
      }
    } else {
      setServiceData({ ...serviceData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setSuccess("You must be logged in to add a service.");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      // Convert price to number before sending to backend
      const payload = { ...serviceData, price: Number(serviceData.price) };

      const res = await axios.post("http://localhost:3000/services", payload);
      if (res.status === 200 || res.status === 201) {
        setSuccess("Service added successfully!");
        setServiceData({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
          location: "",
          email: user.email,
        });
      }
    } catch (error) {
      console.error(error);
      setSuccess("Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800 font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Service title"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Describe the service"
              rows="4"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1">Price ($)</label>
              <input
                type="text"
                name="price"
                value={serviceData.price}
                onChange={handleChange}
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Service price"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-semibold mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={serviceData.category}
                onChange={handleChange}
                className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Category (e.g., Gardening, Indoor Plants)"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={serviceData.location}
              onChange={handleChange}
              className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Service location"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={serviceData.image}
              onChange={handleChange}
              className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              value={serviceData.email}
              readOnly
              className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>

          {success && (
            <p
              className={`mt-3 text-center ${
                success.includes("successfully") ? "text-green-800" : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddService;
