import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { withdrawalRequests } from "../components/data2";
import { orders } from "../components/data";
import { FaCircle } from "react-icons/fa";

interface Order {
  orderId: string;
  shopName: string;
  buyerName: string;
  totalAmount: number;
  income: number;
  orderDate: string;
  status: string;
}

export default function GiaoDich() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("orders"); // Active tab: "orders", "waiting", "paid"
  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const [currentPageWithdrawals, setCurrentPageWithdrawals] = useState(1);

  const rowsPerPage = 10;

  const [giaoDichData, setGiaoDichData] = useState(withdrawalRequests);

  const statusMap: Record<number, { label: string; color: string }> = {
    1: { label: "Chờ thanh toán", color: "bg-orange-200 text-orange-700" },
    3: { label: "Đã thanh toán", color: "bg-green-200 text-green-700" },
  };

  // Mở modal xác nhận
  const openModal = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  // Xác nhận chuyển từ "Chờ thanh toán" → "Đã thanh toán"
  const confirmTransfer = () => {
    if (selectedId !== null) {
      setGiaoDichData((prevData) =>
        prevData.map((item) =>
          item.id === selectedId
            ? { ...item, status: 3, paymentTime: new Date().toLocaleString() }
            : item
        )
      );
    }
    closeModal();
  };

  // Helper function to format date to dd/mm/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString.split("/").reverse().join("/"));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Sort orders by orderDate in descending order
  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.orderDate.split("/").reverse().join("/")).getTime() -
      new Date(a.orderDate.split("/").reverse().join("/")).getTime()
  );

  // Pagination logic for orders
  const totalPagesOrders = Math.ceil(sortedOrders.length / rowsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPageOrders - 1) * rowsPerPage,
    currentPageOrders * rowsPerPage
  );

  const handlePageChangeOrders = (page: number) => {
    if (page >= 1 && page <= totalPagesOrders) {
      setCurrentPageOrders(page);
    }
  };

  // Pagination logic for withdrawal requests
  const filteredWithdrawals = giaoDichData.filter((item: any) => {
    if (activeTab === "waiting") return item.status === 1;
    if (activeTab === "paid") return item.status === 3;
    return true;
  });

  const totalPagesWithdrawals = Math.ceil(
    filteredWithdrawals.length / rowsPerPage
  );
  const paginatedWithdrawals = filteredWithdrawals.slice(
    (currentPageWithdrawals - 1) * rowsPerPage,
    currentPageWithdrawals * rowsPerPage
  );

  const handlePageChangeWithdrawals = (page: number) => {
    if (page >= 1 && page <= totalPagesWithdrawals) {
      setCurrentPageWithdrawals(page);
    }
  };

  return (
    <div className="bg-[#EDF2F9] h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <span className="font-bold text-xl text-gray-600">
          Quản lí giao dịch
        </span>
        <div className="relative w-1/3">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cửa hàng..."
            className="pl-10 pr-3 py-2 rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center">
            <FaBell className="text-[#ed7c44] text-2xl" />
          </div>
          <img
            src="https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=oKNrHcCyEEwQ7kNvwEYANdJ&_nc_oc=AdmQgdpbKKkqwhnmBVfrem5GYsTrTkeX_aaVMMCRf11BGoUENmcUavw1XP3jqm9W2yj0391_nEomItzS0m0qswyP&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=Ub_Y7GE4-TFhUTmIKFaG8Q&oh=00_AfFR4OtBAp141CE8PN_hpAvVxQON-rPEqECLX4CI8eTsxA&oe=67F9E97E"
            alt="User Avatar"
            className="w-11 h-11 rounded-full"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 px-8 mb-3">
        <button
          onClick={() => {
            setActiveTab("orders");
            setCurrentPageOrders(1);
          }}
          className={`px-4 py-1.5 rounded ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Quản lí đơn hàng
        </button>
        <button
          onClick={() => {
            setActiveTab("waiting");
            setCurrentPageWithdrawals(1);
          }}
          className={`px-4 py-1.5 rounded ${
            activeTab === "waiting"
              ? "bg-orange-500 text-white"
              : "border-orange-500 border-2 text-orange-500"
          }`}
        >
          Yêu cầu thanh toán
        </button>
        <button
          onClick={() => {
            setActiveTab("paid");
            setCurrentPageWithdrawals(1);
          }}
          className={`px-4 py-1.5 rounded ${
            activeTab === "paid"
              ? "bg-green-500 text-white"
              : "border-green-500 border-2 text-green-500"
          }`}
        >
          Đã thanh toán
        </button>
      </div>

      {/* Orders Table */}
      {activeTab === "orders" && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mx-10">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-[#699BF4] text-white uppercase text-xs">
              <tr>
                <th className="px-3 py-3">Mã đơn hàng</th>
                <th className="px-3 py-3">Tên cửa hàng</th>
                <th className="px-3 py-3">Khách hàng</th>
                <th className="px-3 py-3">Tổng đơn</th>
                <th className="px-3 py-3">Thu nhập</th>
                <th className="px-3 py-3">Ngày đặt</th>
                <th className="px-3 py-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order: Order) => (
                <tr key={order.orderId} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3.5 font-sans text-gray-800">
                    #{order.orderId}
                  </td>
                  <td className="px-3 py-3.5 font-sans text-gray-800">
                    {order.shopName}
                  </td>
                  <td className="px-3 py-3.5 font-sans text-gray-800">
                    {order.buyerName}
                  </td>
                  <td className="px-3 py-3.5 font-sans text-gray-800">
                    {order.totalAmount}.000 VND
                  </td>
                  <td className="px-3 py-3.5 font-sans text-gray-800">
                    {order.income}.000 VND
                  </td>
                  <td className="px-3 py-3.5 font-sans text-gray-800">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-3 py-2.5 font-sans">
                    <div className="py-1 text-xs flex justify-center items-center gap-2 font-bold rounded-full h-fit text-center bg-green-200 text-green-700">
                      <FaCircle /> {order.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination for orders */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChangeOrders(currentPageOrders - 1)}
          className={`px-3 py-1 mx-1  border-[#699BF4] border-2 rounded-md ${
            currentPageOrders === 1
              ? "text-[#699BF4] cursor-not-allowed"
              : "text-[#699BF4]"
          }`}
          disabled={currentPageOrders === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPagesOrders }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChangeOrders(index + 1)}
            className={`px-3 py-1 mx-1  border-[#699BF4] border-2 rounded-md ${
              currentPageOrders === index + 1
                ? "bg-blue-500 text-white"
                : "text-[#699BF4]"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChangeOrders(currentPageOrders + 1)}
          className={`px-3 py-1 mx-1  border-[#699BF4] border-2 rounded-md ${
            currentPageOrders === totalPagesOrders
              ? "text-[#699BF4] cursor-not-allowed"
              : "text-[#699BF4]"
          }`}
          disabled={currentPageOrders === totalPagesOrders}
        >
          {">"}
        </button>
      </div>
      {/* Withdrawals Table */}
      {activeTab !== "orders" && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mx-10">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-[#699BF4] text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-3 py-3">Tên cửa hàng</th>
                <th className="px-3 py-3">Số tiền rút</th>
                <th className="px-3 py-3">Ngân hàng</th>
                <th className="px-3 py-3">Số tài khoản</th>
                <th className="px-3 py-3">Trạng thái</th>
                <th className="px-3 py-3">Thời gian thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWithdrawals.map(
                (withdrawal: {
                  id: number;
                  shopName: string;
                  amount: number;
                  bankName: string;
                  accountNumber: string;
                  status: number;
                  paymentTime?: string;
                }) => (
                  <tr
                    key={withdrawal.id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="px-4 py-4">{withdrawal.id}</td>
                    <td className="px-3 py-4">{withdrawal.shopName}</td>
                    <td className="px-3 py-4">{withdrawal.amount}</td>
                    <td className="px-3 py-4">{withdrawal.bankName}</td>
                    <td className="px-3 py-4">{withdrawal.accountNumber}</td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() =>
                          withdrawal.status === 1
                            ? openModal(withdrawal.id)
                            : null
                        }
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusMap[withdrawal.status].color
                        } ${
                          withdrawal.status === 3
                            ? "cursor-default"
                            : "hover:opacity-80"
                        }`}
                        disabled={withdrawal.status === 3}
                      >
                        {statusMap[withdrawal.status].label}
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      {withdrawal.paymentTime ? withdrawal.paymentTime : "__"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {/* Pagination for withdrawals */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() =>
                handlePageChangeWithdrawals(currentPageWithdrawals - 1)
              }
              className={`px-3 py-1 mx-1 rounded ${
                currentPageWithdrawals === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
              disabled={currentPageWithdrawals === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPagesWithdrawals }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChangeWithdrawals(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPageWithdrawals === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                handlePageChangeWithdrawals(currentPageWithdrawals + 1)
              }
              className={`px-3 py-1 mx-1 rounded ${
                currentPageWithdrawals === totalPagesWithdrawals
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200"
              }`}
              disabled={currentPageWithdrawals === totalPagesWithdrawals}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal xác nhận */}
      {modalOpen && selectedId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {(() => {
              const selectedShop = giaoDichData.find(
                (shop) => shop.id === selectedId
              );
              return selectedShop ? (
                <>
                  <p className="text-lg font-medium font-sans mb-4">
                    Bạn xác nhận thanh toán cho{" "}
                    <span className="font-medium text-blue-600">
                      {selectedShop.shopName}
                    </span>
                    ?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={confirmTransfer}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Xác nhận
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-lg font-semibold text-red-500">
                  Lỗi: Không tìm thấy giao dịch.
                </p>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
