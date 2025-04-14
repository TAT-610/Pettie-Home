import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { User } from "../components/data3";

type User = {
  id: string;
  email: string;
  emailConfirmed?: boolean;
  fullname: string;
  phone: string | null;
  isEnabled?: boolean;
  isLockedOut?: boolean;
  lockoutEnd?: Date | null;
  pictureFileName?: string | null;
  pictureUrl?: string | null;
  role: string[];
};

const NguoiDung = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchUsers = (searchQuery = "") => {
      const filtered = User.filter(
        (user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.phone && user.phone.includes(searchQuery))
      ).map((user) => ({
        ...user,
        role: Array.isArray(user.role) ? user.role : [user.role], // Ensure role is an array
      }));
      setFilteredUsers(filtered);
    };

    fetchUsers(searchTerm);
  }, [searchTerm]);

  const toggleUserStatus = (user: User) => {
    if (!user) return;
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmToggleStatus = () => {
    if (!selectedUser) return;
    setFilteredUsers((prevData) =>
      prevData.map((user) =>
        user.id === selectedUser.id
          ? { ...user, isLockedOut: !user.isLockedOut }
          : user
      )
    );
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

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
              placeholder="Tìm kiếm theo email, tên hoặc số điện thoại..."
              className="pl-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg my-5 mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Tên tài khoản</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center">
                  Không tìm thấy người dùng phù hợp.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-4 py-2.5">{user.id}</td>
                  <td className="px-4 py-2.5">{user.email}</td>
                  <td className="px-4 py-2.5">{user.fullname}</td>
                  <td className="px-4 py-2.5">{user.phone ?? "_"}</td>
                  <td className="px-4 py-2.5">{user.role}</td>
                  <td className="px-4 py-2.5">
                    <button
                      className={`px-3 py-1 rounded-md font-sans ${
                        user.isLockedOut
                          ? "border-red-500 border-2 text-red-600"
                          : "border-green-500 border-2 text-green-600"
                      }`}
                      title={
                        user.isLockedOut
                          ? "Tài khoản này đang bị khóa"
                          : "Tài khoản này đang hoạt động"
                      }
                      onClick={() => toggleUserStatus(user)}
                    >
                      {user.isLockedOut ? "Không hoạt động" : "Đang hoạt động"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal giữ nguyên */}
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
