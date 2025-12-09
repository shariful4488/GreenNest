import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);

  // Fetch My Services
  useEffect(() => {
    if (authLoading) return;

    if (user?.email) {
      fetch(`http://localhost:3000/my-services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyServices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user, authLoading]);

  // Delete Service
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setMyServices(myServices.filter((s) => s._id !== id));
        toast.success("Service deleted successfully!");
      } else {
        toast.error("Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading your services...
      </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          My Services ({myServices.length})
        </h1>

        {myServices.length === 0 ? (
          <p className="text-lg text-gray-600">No services added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-xl border">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {myServices.map((service) => (
                  <tr key={service._id} className="border-t hover:bg-green-50">
                    {/* IMAGE */}
                    <td className="py-3 px-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </td>

                    {/* NAME (Fixed Title) */}
                    <td className="py-3 px-4 font-semibold">
                      {service.title}
                    </td>
                    {/* DESCRIPTION */}
                    <td className="py-3 px-4">
                        {service.description.length > 100
                            ? service.description.slice(0, 100) + "..."
                            : service.description}
                    </td>

                    {/* PRICE */}
                    <td className="py-3 px-4 text-green-700 font-bold">
                      ${service.price}
                    </td>

                    {/* CATEGORY */}
                    <td className="py-3 px-4">{service.category}</td>

                    {/* ACTIONS */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">

                        {/* EDIT BUTTON */}
                        <Link
                          to={`/update-service/${service?._id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Edit
                        </Link>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
  );
};

export default MyServices;
