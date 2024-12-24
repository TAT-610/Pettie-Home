import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

const stores = [
  { id: 1, shopName: "Clarke Pitts", status: "Pending", price: 50 },
  { id: 2, shopName: "Haven Essentials", status: "Pending", price: 75 },
  { id: 3, shopName: "Paws & Claws", status: "Pending", price: 120 },
  { id: 4, shopName: "Pets Paradise", status: "Pending", price: 95 },
];

const XetDuyetCuaHang = () => {
  const [storeData, setStoreData] = useState(stores);

  const handleApprove = (id: number) => {
    setStoreData(prevState =>
      prevState.map(store =>
        store.id === id ? { ...store, status: "Approved" } : store
      )
    );
  };

  const handleReject = (id: number) => {
    setStoreData(prevState =>
      prevState.map(store =>
        store.id === id ? { ...store, status: "Rejected" } : store
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[#57c6c5] p-5">
        <h1 className="text-2xl font-medium text-gray-700">Trang / Xét Duyệt Cửa Hàng</h1>
        <div className="flex items-center space-x-4">
          {/* User Section */}
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40" // Placeholder image
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-semibold">Admin</span>
          </div>
        </div>
      </div>

      {/* Store Approval Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-green-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Shop Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((store) => (
              <tr key={store.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="px-4 py-3">{store.id}</td>
                <td className="px-4 py-3">{store.shopName}</td>
                <td className="px-4 py-3">
                  {/* Conditional styling for status */}
                  <span
                    className={`${
                      store.status === "Approved"
                        ? "text-green-500"
                        : store.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {store.status}
                  </span>
                </td>
                <td className="px-4 py-3">{store.price} USD</td>
                <td className="px-4 py-3 flex items-center space-x-4">
                  {/* Approve Button */}
                  {store.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(store.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                  {/* Reject Button */}
                  {store.status === "Pending" && (
                    <button
                      onClick={() => handleReject(store.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default XetDuyetCuaHang;
