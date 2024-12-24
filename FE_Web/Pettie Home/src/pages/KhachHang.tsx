import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const customers = [
  { id: 50, username: "zekix", name: "Clarke Pitts", email: "zekix@mailinator.com", role: "editor", createdAt: "Jul 19, 2020" },
  { id: 49, username: "huyqbos", name: "Whoopi Sellers", email: "huyqbos@mailinator.com" },
  { id: 48, username: "fubidat", name: "Ezekiel Guerrero", email: "fubidat@mailinator.com" },
  { id: 47, username: "manjula.jaswini@gmail.com_344", name: "Manjula Vinoth Kumar", email: "manjula.jaswini@gmail.com" },
  { id: 46, username: "Auditor2", name: "Auditor 2", email: "auditor2@dashboard.test" },
  { id: 45, username: "Auditor", name: "Auditor Name", email: "auditor@dashboard.test" },
  { id: 44, username: "testforuserrole", name: "test user role", email: "testforuserrole@test.test" },
  { id: 41, username: "userthree@dashboard.com_669", name: "User Three", email: "userthree@dashboard.com" },
  { id: 40, username: "nigava@mailinator.com931", name: "Alexandra Duran", email: "nigava@mailinator.com" },
  { id: 39, username: "usertwo", name: "User Two", email: "usertwo@dashboard.com" },
];

const KhachHang = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[#57c6c5] p-5">
        <h1 className="text-2xl font-medium text-gray-700">Trang / Khách hàng</h1>
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
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Gmail</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3">{customer.id}</td>
                <td className="px-4 py-3">{customer.username}</td>
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
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

export default KhachHang;
