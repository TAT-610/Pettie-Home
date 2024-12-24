import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const stores = [
  { id: 1, createdAt: "Jul 19, 2020", shopName: "Clarke Pitts", status: "Completed", price: 50 },
  { id: 2, createdAt: "Aug 1, 2021", shopName: "Haven Essentials", status: "Incompleted", price: 75 },
  { id: 3, createdAt: "Oct 15, 2021", shopName: "Paws & Claws", status: "Completed", price: 120 },
  { id: 4, createdAt: "Nov 2, 2020", shopName: "Pets Paradise", status: "Incompleted", price: 95 },
  { id: 5, createdAt: "Jan 10, 2022", shopName: "Furry Friends", status: "Completed", price: 30 },
  { id: 6, createdAt: "Mar 22, 2021", shopName: "Puppy Love", status: "Incompleted", price: 60 },
  { id: 7, createdAt: "Dec 5, 2020", shopName: "Bark Avenue", status: "Completed", price: 110 },
  { id: 8, createdAt: "Jun 18, 2021", shopName: "Kitty Corner", status: "Incompleted", price: 40 },
];

const CuaHang = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[#57c6c5] p-5">
        <h1 className="text-2xl font-medium text-gray-700">Trang / Cửa hàng</h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Tra cứu ....."
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/2" // Increased width of search bar
          />
          
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

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-green-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Shop Name</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="px-4 py-3">{store.id}</td>
                <td className="px-4 py-3">{store.createdAt}</td>
                <td className="px-4 py-3">{store.shopName}</td>
                <td className="px-4 py-3">
                  {/* Conditional styling for status */}
                  <span
                    className={`${
                      store.status === "Completed" ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    {store.status}
                  </span>
                </td>
                <td className="px-4 py-3">{store.price} USD</td>
                <td className="px-4 py-3 flex items-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">&lt;</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${page === 1 ? "bg-green-200 text-gray-700" : "text-gray-600 hover:bg-gray-200"}`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default CuaHang;
