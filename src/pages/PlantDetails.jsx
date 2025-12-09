import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const PlantDetails = () => {
  const { plantId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await fetch(`http://localhost:3000/services/${plantId}`);
        const data = await res.json();
        setPlant(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlant();
  }, [plantId]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    return (
      <span className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </span>
    );
  };

  // ---------------- ORDER SUBMIT ----------------
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      plantId,
      plantTitle: plant.title,
      customerName: form.name.value,
      customerEmail: form.email.value,
      address: form.address.value,
      price: plant.price,
      quantity: form.quantity.value,
      date: new Date(),
      status: "pending",
    };

    try {
      await axios.post("http://localhost:3000/orders", orderData);
      toast.success("Order placed successfully!");
      form.reset();
      setOpenModal(false);

      // Redirect to My Orders page
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order!");
    }
  };

  if (!plant) {
    return (
      <div className="text-center py-20 text-2xl font-semibold text-red-500">
        Plant not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-10 max-w-6xl">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
        {plant.title}
      </h1>

      {/* ---------- DETAILS CARD ---------- */}
      <div className="bg-white p-6 md:p-10 shadow-xl rounded-2xl">
        <div className="grid md:grid-cols-2 gap-10">
          <img
            src={plant.image}
            alt={plant.title}
            className="w-full h-auto object-cover rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">{plant.title}</h2>
            <p className="text-sm text-gray-500">Category: {plant.category}</p>

            <div className="flex justify-between items-end my-4 border-b pb-4">
              <p className="text-3xl font-bold text-green-600">
                Price: ${plant.price}
              </p>
              <p className="flex items-center gap-1 text-lg">
                Rating: {renderRatingStars(plant.rating)}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">{plant.description}</p>

            <button
              onClick={() => setOpenModal(true)}
              className="mt-6 bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-800 transition-all font-bold"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* ------------------ ORDER MODAL ------------------ */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Place Your Order
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email || ""}
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  placeholder="Enter delivery address"
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                ></textarea>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={1}
                  min={1}
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 font-bold"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetails;
