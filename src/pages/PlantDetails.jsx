import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import plantData from "../../public/tree.json";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";



const PlantDetails = () => {
  const { plantId } = useParams();
  const { user } = useContext(AuthContext);
  const [plant, setPlant] = useState(null);
  const data = useLoaderData();
  

  useEffect(() => {
    
    const timer = setTimeout(() => {
      const foundPlant = plantData.find(
        (p) => p.plantId === parseInt(plantId)
      );
      if (foundPlant) {
        setPlant({
          ...foundPlant,
          lightNeeds: foundPlant.lightNeeds || "Bright Indirect Sunlight",
          size: foundPlant.size || "Medium",
        });
      }
    }, 800); 

    return () => clearTimeout(timer);
  }, [plantId]);

  const handleBookConsultation = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    toast.success(
      `Thank You ${name}  Our expert will contact you soon.`,
      { autoClose: 4000 }
    );

    form.reset();
  };

  if (!plant) {
    return (
      <div className="text-center py-20 text-2xl font-semibold text-red-500">
        Plant not found!
      </div>
    );
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <span className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4 my-10 max-w-6xl">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
        {plant.plantName}
      </h1>

      <div className="bg-white p-6 md:p-10 shadow-xl rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <img
              src={plant.image}
              alt={plant.plantName}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
            <p className="text-gray-500 text-sm">
              <strong>Current Stock:</strong>{" "}
              <span className="font-semibold text-gray-700">
                {plant.availableStock} units
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{plant.plantName}</h2>
            <p className="text-sm text-gray-500">Category: {plant.category}</p>

            <div className="flex justify-between items-end my-4 border-b pb-4">
              <p className="text-3xl font-bold text-green-600">
                Price: ${plant.price}
              </p>
              <p className="flex items-center gap-1 text-lg">
                Rating: {renderRatingStars(plant.rating)}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {plant.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
                Details:
              </h3>
              <div className="grid grid-cols-2 text-gray-700 border-b pb-2">
                <span className="font-medium">Care Level:</span>
                <span>{plant.careLevel}</span>
              </div>
              <div className="grid grid-cols-2 text-gray-700 border-b pb-2">
                <span className="font-medium">Size:</span>
                <span>{plant.size}</span>
              </div>
              <div className="grid grid-cols-2 text-gray-700 border-b pb-2">
                <span className="font-medium">Light Needs:</span>
                <span>{plant.lightNeeds}</span>
              </div>
              <div className="grid grid-cols-2 text-gray-700 pt-2">
                <span className="font-medium">Provider:</span>
                <span className="text-blue-600 font-semibold">
                  {plant.providerName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-green-100">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Book Consultation
        </h2>

        <form onSubmit={handleBookConsultation} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300 font-bold text-lg shadow-md"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlantDetails;
