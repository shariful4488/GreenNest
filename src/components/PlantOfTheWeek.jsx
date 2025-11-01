import React, { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa"; 
import { AiFillStar } from "react-icons/ai"; 
import Loading from "./Loading";

const PlantOfTheWeek = () => {
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    fetch("/plantOfTheWeek.json")
      .then((res) => res.json())
      .then((data) => setPlant(data))
      .catch((err) => console.error(err));
  }, []);

  if (!plant) return <Loading></Loading>;
  return (
    <div className="py-10 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
         Plant of the Week
      </h1>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full h-96 overflow-hidden">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-8">
          <div className="mb-4">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {plant.plantName}
            </h2>
            <p className="text-sm font-semibold text-green-600 uppercase mt-1 tracking-wider">
              {`Category: ${plant.category}`}
            </p>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4 text-center border border-gray-200 rounded-lg p-3 bg-gray-50 mb-6">
            <div>
              <p className="text-xl font-bold text-green-700 leading-none">
                ${plant.price}
              </p>
              <p className="text-xs text-gray-500 mt-1">Special Price</p>
            </div>
            <div className="border-l border-gray-200">
              <p className="text-xl font-bold text-yellow-600 leading-none flex items-center justify-center space-x-1">
                {plant.rating}
                <AiFillStar className="text-yellow-500 text-2xl" />
              </p>
              <p className="text-xs text-gray-500 mt-1">Average Rating</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {plant.description}
          </p>

          <div className="bg-green-50 border-l-4 border-green-300 p-4 text-green-700 italic flex items-start space-x-2">
            <FaLightbulb className="text-xl shrink-0 mt-0.5" />
            <span>
              PRO TIP: Wipe leaves gently with a damp cloth to keep them shiny
              and healthy.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantOfTheWeek;
