import { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { getAllUser } from "../services/api";

type User = {
  id: string; // UUID
  email: string;
  emailConfirmed: boolean;
  fullName: string;
  phoneNumber: string | null;
  isEnabled: boolean;
  isLockedOut: boolean;
  lockoutEnd: Date | null;
  pictureFileName: string | null;
  pictureUrl: string | null;
  roles: string[]; // Mảng chứa các vai trò
};


const NguoiDung = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Dữ liệu người dùng từ API

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUser(1, 10); // Gọi API lấy danh sách người dùng
        setUsers(users); // Lưu dữ liệu vào state
        console.log("Dữ liệu API trả về:", users);

        if (!Array.isArray(users)) {
          console.error("Dữ liệu API không đúng định dạng:", users);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    fetchUsers();
  }, []);


  const toggleUserStatus = (user: User) => {
    if (!user) return;
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmToggleStatus = () => {
    if (!selectedUser) return;
    setUsers((prevData) =>
      prevData.map((user) =>
        user.id === selectedUser.id
          ? { ...user, locked: !user.isLockedOut }
          : user
      )
    );
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-[#EDF2F9] min-h-screen overflow-auto relative">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Quản lí người dùng
          </span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center">
            <FaBell className="text-[#ed7c44] text-2xl" />
          </div>
          <img
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg"
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
              <th className="px-4 py-3">email</th>
              <th className="px-4 py-3">Tên tài khoản</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => !user.roles.includes("shop") && !user.roles.includes("admin")) // Lọc bỏ user có role shop/admin
              .map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.phoneNumber ?? "_"}</td>
                  <td className="px-4 py-3">{user.roles.length > 0 ? user.roles.join(", ") : "Chưa có vai trò"}</td>
                  <td className="px-4 py-3">
                    <button
                      className={`px-3 py-1 rounded-md font-sans ${user.isLockedOut ? "border-red-500 border-2 text-red-600" : "border-green-500 border-2 text-green-600"
                        }`}
                      title={user.isLockedOut ? "Tài khoản này đang bị khóa" : "Tài khoản này đang hoạt động"}
                      onClick={() => toggleUserStatus(user)}
                    >
                      {user.isLockedOut ? "Không hoạt động" : "Đang hoạt động"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>


        </table>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Xác nhận thay đổi trạng thái
            </h2>
            <p>
              Bạn có chắc chắn muốn thay đổi trạng thái của{" "}
              <strong>{selectedUser.email}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-[#ed7c44] text-white rounded-md mr-2"
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
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
