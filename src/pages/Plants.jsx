import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // "low" or "high"

  // Fetch all plants once
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch("http://localhost:3000/services");
        const data = await res.json();
        setPlants(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlants();
  }, []);

  // Apply filter, search, sort
  useEffect(() => {
    let temp = [...plants];

    // Category filter
    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    // Search filter
    if (search.trim() !== "") {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  }, [plants, category, search, sort]);

  // Extract unique categories
  const categories = ["all", ...new Set(plants.map((p) => p.category))];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4">

      {/* Title */}
      <h1 className="text-4xl font-bold text-green-600 text-center mb-6">
        Our Plant Collection
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Category */}
        <select
          className="border border-green-600 px-4 py-2 rounded-md text-green-700 font-semibold"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort */}
        <select
          className="border border-green-600 px-4 py-2 rounded-md text-green-700 font-semibold"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((plant) => (
          <div
            key={plant._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={plant.image}
              alt={plant.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mt-2">{plant.title}</h2>
              <p className="text-green-600 font-bold mt-1">${plant.price}</p>

              <p className="mt-1 text-gray-700 font-semibold flex items-center gap-1">
                Rating:
                <span className="text-yellow-500 flex items-center gap-1">
                  {plant.rating} <FaStar />
                </span>
              </p>

              <Link
                to={`/plantDetails/${plant._id}`}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer w-full block text-center font-semibold transition duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-lg">
          No plants found.
        </p>
      )}
    </div>
  );
};

export default Plants;
