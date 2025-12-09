import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders`);
        // Filter by current user email
        const userOrders = res.data.filter(
          (order) => order.customerEmail === user?.email
        );
        setOrders(userOrders);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user?.email]);

  // Delete / Cancel order
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/orders/${id}`);
          setOrders(orders.filter((o) => o._id !== id));
          Swal.fire("Cancelled!", "Your order has been removed.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to cancel order.", "error");
        }
      }
    });
  };

  // Mark order as completed
  const handleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, {
        status: "completed",
      });
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: "completed" } : o
        )
      );
      Swal.fire("Updated!", "Order marked as completed.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update order.", "error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-semibold">{order.plantTitle}</td>
                  <td className="p-3">${order.price}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "completed"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {order.status !== "completed" && (
                      <>
                        <button
                          onClick={() => handleComplete(order._id)}
                          className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="cursor-pointer px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
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

export default MyOrders;
