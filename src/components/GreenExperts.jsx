import React, { useEffect, useState } from "react";

const GreenExperts = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetch("/experts.json")
      .then((res) => res.json())
      .then((data) => setExperts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
        Meet Our Green Experts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition text-center"
          >
            <img
              src={expert.image}
              alt={expert.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{expert.name}</h2>
              <p className="text-gray-700 mt-1">{expert.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreenExperts;
