import React from "react";

const customersData = [
  {
    id: 1,
    username: "zekix",
    name: "Clarke Pitts",
    revenue: 4500000,
    role: "editor",
    createdAt: "Jul 19, 2020",
    locked: true,
  },
  {
    id: 2,
    username: "huyqbos",
    name: "Whoopi Sellers",
    phone: "093-551-0123",
    locked: false,
  },
  {
    id: 3,
    username: "fubidat",
    name: "Ezekiel Guerrero",
    phone: "093-229-0123",
    locked: true,
  },
  {
    id: 4,
    username: "manjula.jaswini@gmail.com_344",
    name: "Manjula Vinoth Kumar",
    phone: "093-789-0123",
    locked: false,
  },
  {
    id: 5,
    username: "Auditor2",
    name: "Auditor 2",
    phone: "094-890-1234",
    locked: false,
  },
  {
    id: 6,
    username: "Auditor",
    name: "Auditor Name",
    phone: "095-901-2345",
    locked: false,
  },
  {
    id: 7,
    username: "testforuserrole",
    name: "test user role",
    phone: "096-012-3456",
    locked: false,
  },
  {
    id: 8,
    username: "userthree@dashboard.com_669",
    name: "User Three",
    phone: "097-123-4567",
    locked: false,
  },
  {
    id: 9,
    username: "nigava@mailinator.com931",
    name: "Alexandra Duran",
    phone: "098-234-5678",
    locked: false,
  },
  {
    id: 10,
    username: "usertwo",
    name: "User Two",
    phone: "099-345-6789",
    locked: false,
  },
];

const KhachHang = () => {
  const handleActionChange = (customerId: number, action: string) => {
    if (action === "lock") {
      alert(`Khóa tài khoản người dùng có ID: ${customerId}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
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
              <th className="px-4 py-3">Tên người dùng</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td
                  className={`px-4 py-3 ${
                    customer.locked ? "text-red-500" : ""
                  }`}
                >
                  {customer.id}
                </td>
                <td
                  className={`px-4 py-3 ${
                    customer.locked ? "text-red-500" : ""
                  }`}
                >
                  {customer.username}
                </td>
                <td
                  className={`px-4 py-3 ${
                    customer.locked ? "text-red-500" : ""
                  }`}
                >
                  {customer.name}
                </td>
                <td
                  className={`px-4 py-3 ${
                    customer.locked ? "text-red-500" : ""
                  }`}
                >
                  {customer.phone}
                </td>
                <td className="px-4 py-3">
                  <select
                    className="border border-gray-300 rounded-lg px-2 py-1"
                    onChange={(e) =>
                      handleActionChange(customer.id, e.target.value)
                    }
                  >
                    <option value="">Chọn hành động</option>
                    <option value="lock">Khóa tài khoản</option>
                  </select>
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
                  ? "bg-[#699BF4] text-gray-700"
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

export default KhachHang;
