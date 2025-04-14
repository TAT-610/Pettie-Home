import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { withdrawalRequests } from "../components/data2";
import { orders } from "../components/data";
import { FaCircle } from "react-icons/fa";

interface Order {
  orderId: number;
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

  const rowsPerPage = 10;

  const [giaoDichData, setGiaoDichData] = useState(withdrawalRequests);

  // const statusMap: Record<number, { label: string; color: string }> = {
  //   1: { label: "Chờ thanh toán", color: "bg-orange-200 text-orange-700" },
  //   3: { label: "Đã thanh toán", color: "bg-green-200 text-green-700" },
  // };

  // Mở modal xác nhận
  // const openModal = (id: number) => {
  //   setSelectedId(id);
  //   setModalOpen(true);
  // };

  // Đóng modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  // Helper function to format currency
  // const formatCurrency = (amount: number) => {
  //   return `${amount.toLocaleString("vi-VN")} VND`;
  // };

  // Xác nhận chuyển từ "Chờ thanh toán" → "Đã thanh toán"
  const confirmTransfer = () => {
    if (selectedId !== null) {
      const exists = giaoDichData.some((item) => item.id === selectedId);
      if (!exists) {
        alert("Lỗi: Không tìm thấy giao dịch.");
        closeModal();
        return;
      }
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
    setCurrentPageOrders((prev) =>
      page >= 1 && page <= totalPagesOrders ? page : prev
    );
  };

  const renderModalContent = () => {
    const selectedShop = giaoDichData.find((shop) => shop.id === selectedId);
    if (!selectedShop) {
      return (
        <p className="text-lg font-semibold text-red-500">
          Lỗi: Không tìm thấy giao dịch.
        </p>
      );
    }
    return (
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
    );
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
      {/* Modal xác nhận */}
      {modalOpen && selectedId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}
