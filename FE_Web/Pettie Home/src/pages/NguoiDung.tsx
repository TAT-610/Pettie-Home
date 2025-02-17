import React, { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const initialCustomersData = [
  {
    id: 1,
    username: "Nguyễn Thị Thanh Thanh",
    name: "Thanh_11",
    phone: "0886133229",
    locked: true,
  },
  {
    id: 2,
    username: "Huỳnh Thị Ánh",
    name: "Huỳnh Ánh",
    phone: "0978166553",
    locked: false,
  },
  {
    id: 3,
    username: "Nguyễn Cao Kỳ Duyên",
    name: "Duyn Duyn ",
    phone: "0933188559",
    locked: true,
  },
  {
    id: 4,
    username: "Trần Huỳnh Yến Vy",
    name: "Vyvy_22",
    phone: "0886225996",
    locked: false,
  },
  {
    id: 5,
    username: "Trần Thanh Tú",
    name: "Tudeptrai",
    phone: "0948745632",
    locked: false,
  },
  {
    id: 6,
    username: "Trương Quang Sang",
    name: "sangsang",
    phone: "0959012345",
    locked: false,
  },
  {
    id: 7,
    username: "Du Hoài Mộng Huyền",
    name: "huyềndhm",
    phone: "0960123456",
    locked: false,
  },
  {
    id: 8,
    username: "Phan Thị Thanh Thảo",
    name: "Thảo PhanPhan",
    phone: "097-123-4567",
    locked: false,
  },
  {
    id: 9,
    username: "Huỳnh Thị Anh Thi",
    name: "thy hoàng",
    phone: "098978166334",
    locked: false,
  },
  {
    id: 10,
    username: "Nguyễn Nhật Hào",
    name: "Haven",
    phone: "0993456789",
    locked: false,
  },
];

const NguoiDung = () => {
  const [customersData, setCustomersData] = useState(initialCustomersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("customersData");
    if (storedData) {
      setCustomersData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customersData", JSON.stringify(customersData));
  }, [customersData]);

  const toggleUserStatus = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmToggleStatus = () => {
    setCustomersData((prevData) =>
      prevData.map((customer) =>
        customer.id === selectedUser.id
          ? { ...customer, locked: !customer.locked }
          : customer
      )
    );
    setShowModal(false);
  };

  return (
    <div className="bg-[#EDF2F9] h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Khách hàng
          </span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center">
            <FaBell className="text-[#ed7c44] text-2xl " />
          </div>
          <img
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=gkM1v5r9zwAQ7kNvgF7IFFZ&_nc_oc=AdhQ52ZlYkqQpAIU_Tuhkd-vR6O-4vRPGmG-91UolUAt_ciQNsVq4_w3MDlJdGzDYUY&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=AYBzQOllhf6SdT5VHlsmU2f&oh=00_AYBeVgH3T15kdkQDRJ_t98tnANx2bjxV3GBG64S37aUVPA&oe=67B836BE"
            alt="User Avatar"
            className="w-11 h-11 rounded-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg my-5 mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên người dùng</th>
              <th className="px-4 py-3">Tên tài khoản</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {customersData.map((customer) => (
              <tr key={customer.id} className="bg-white border-b">
                <td className="px-4 py-[10px]">{customer.id}</td>
                <td className="px-4 py-[10px]">{customer.username}</td>
                <td className="px-4 py-[10px]">{customer.name}</td>
                <td className="px-4 py-[10px]">{customer.phone}</td>
                <td className="px-4 py-[10px]">
                  <button
                    className={`px-3 py-1 rounded-md font-sans ${
                      customer.locked
                        ? "border-red-500 border-2 text-red-600"
                        : "border-green-500 border-2 text-green-600"
                    }`}
                    onClick={() => toggleUserStatus(customer)}
                  >
                    {customer.locked ? "Không hoạt động" : "Đang hoạt động"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-2">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded-md ${
                page === 1
                  ? "bg-[#699BF4] text-white"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Xác nhận thay đổi trạng thái
            </h2>
            <p>
              Bạn có chắc chắn muốn thay đổi trạng thái của{" "}
              <strong>{selectedUser.username}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-[#ed7c44] text-white rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={confirmToggleStatus}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NguoiDung;
