import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateService = () => {
  const { id } = useParams(); // service id
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Existing Service Data
  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // Handle Update Submit
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedService = {
      title: form.title.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      image: form.image.value,
      description: form.description.value,
    };

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedService),
      });

      if (res.ok) {
        toast.success("Service updated successfully!");
        navigate("/my-services");
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error while updating.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Update Service
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Service Title</label>
            <input
              type="text"
              name="title"
              defaultValue={service.title}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={service.category}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              name="price"
              defaultValue={service.price}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={service.image}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={service.description}
              rows="4"
              required
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
          >
            Update Service
          </button>
        </form>
      </div>
  );
};

export default UpdateService;
