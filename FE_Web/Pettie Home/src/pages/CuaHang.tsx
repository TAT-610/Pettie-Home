import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const stores = [
  {
    id: 1,
    createdAt: "Jul 19, 2020",
    shopName: "Clarke Pitts",
    revenue: 4500000,
    status: "Completed",
    price: 50,
  },
  {
    id: 2,
    createdAt: "Aug 1, 2021",
    shopName: "Haven Essentials",
    revenue: 1700000,
    status: "Incompleted",
    price: 75,
  },
  {
    id: 3,
    createdAt: "Oct 15, 2021",
    shopName: "Paws & Claws",
    revenue: 200000,
    status: "Completed",
    price: 120,
  },
  {
    id: 4,
    createdAt: "Nov 2, 2020",
    shopName: "Pets Paradise",
    revenue: 130130000,
    status: "Incompleted",
    price: 95,
  },
  {
    id: 5,
    createdAt: "Jan 10, 2022",
    shopName: "Furry Friends",
    revenue: 500000,
    status: "Completed",
    price: 30,
  },
  {
    id: 6,
    createdAt: "Mar 22, 2021",
    shopName: "Puppy Love",
    revenue: 2350000,
    status: "Incompleted",
    price: 60,
  },
  {
    id: 7,
    createdAt: "Dec 5, 2020",
    shopName: "Bark Avenue",
    revenue: 475000,
    status: "Completed",
    price: 110,
  },
  {
    id: 8,
    createdAt: "Jun 18, 2021",
    shopName: "Kitty Corner",
    revenue: 2400000,
    status: "Incompleted",
    price: 40,
  },
];

const CuaHang = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-24">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Tìm kiếm ....."
            className="border border-gray-300 rounded-lg px-4 py-2 w-96"
          />
        </div>
        {/* Avatar at the top-right corner */}
        <div className="absolute top-4 right-4">
          <img
            src="/src/assets/user.png"
            alt="User"
            className="w-10 h-10 rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên cửa hàng</th>
              <th className="px-4 py-3">Ngày tạo</th>
              <th className="px-4 py-3">Doanh thu</th>
              <th className="px-4 py-3">Doanh thu cho hệ thống</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3">{store.id}</td>
                <td className="px-4 py-3">{store.shopName}</td>
                <td className="px-4 py-3">{store.createdAt}</td>
                <td className="px-4 py-3">
                  {store.revenue.toLocaleString()} VND
                </td>
                <td className="px-4 py-3">
                  {(store.revenue * 0.1).toLocaleString()} VND
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${
                page === 1
                  ? "bg-green-200 text-gray-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuaHang;
