import React, { useEffect, useState } from "react";

const PlantCareTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("/plantTips.json")
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
        Plant Care Tips
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition"
          >
            <div className="text-5xl text-center">{tip.icon}</div>
            <h2 className="text-xl font-semibold mt-4 text-center">{tip.title}</h2>
            <p className="mt-2 text-gray-700 text-center">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantCareTips;
