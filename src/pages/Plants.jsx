import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";



const Plants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch("/tree.json");
        const data = await res.json();
        setPlants(data);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
        Our Plant Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.plantId}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={plant.image}
              alt={plant.plantName}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mt-2">{plant.plantName}</h2>
              <p className="text-green-600 font-bold mt-1">${plant.price}</p>
              <p className="mt-1 text-gray-700 font-semibold flex items-center gap-1">
                Rating:
                <span className="text-yellow-500 flex items-center gap-1">
                  {plant.rating} <FaStar />
                </span>
              </p>
              <Link
                to={`/plantDetails/${plant.plantId}`}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer w-full block text-center font-semibold transition duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
