import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";

export default function GiaoDich() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const [giaoDichData, setGiaoDichData] = useState([
    {
      id: 1,
      shopName: "Tiệm nhà Bụp",
      amount: "450.000 VND",
      bankName: "Vietcombank",
      accountNumber: "123456789",
      status: 1,
      paymentTime: null,
    },
    {
      id: 2,
      shopName: "Pet Shop Thủ Đức",
      amount: "325.000 VND",
      bankName: "Techcombank",
      accountNumber: "987654321",
      status: 3,
      paymentTime: "2/17/2025, 8:38:36 AM",
    },
    {
      id: 3,
      shopName: "Thế giới thú cưng Quin Quin",
      amount: "365.000 VND",
      bankName: "BIDV",
      accountNumber: "567890123",
      status: 2,
      paymentTime: null,
    },
    {
      id: 4,
      shopName: "Pet mart quận 9",
      amount: "2,750,000 VND",
      bankName: "Agribank",
      accountNumber: "654321987",
      status: 1,
      paymentTime: null,
    },
  ]);

  const statusMap = {
    1: { label: "Chờ thanh toán", color: "bg-orange-200 text-orange-700" },
    2: {
      label: "Hệ thống chờ thanh toán",
      color: "bg-yellow-200 text-yellow-700",
    },
    3: { label: "Đã thanh toán", color: "bg-green-200 text-green-700" },
  };

  // Mở modal xác nhận
  const openModal = (id) => {
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

  // Lọc giao dịch theo trạng thái
  const filteredData = giaoDichData.filter((item) => {
    if (filter === "all") return item.status === 1 || item.status === 3;
    if (filter === "waiting") return item.status === 1;
    if (filter === "paid") return item.status === 3;
    if (filter === "systemWaiting") return item.status === 2;
    return true;
  });

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
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=gkM1v5r9zwAQ7kNvgF7IFFZ&_nc_oc=AdhQ52ZlYkqQpAIU_Tuhkd-vR6O-4vRPGmG-91UolUAt_ciQNsVq4_w3MDlJdGzDYUY&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=AYBzQOllhf6SdT5VHlsmU2f&oh=00_AYBeVgH3T15kdkQDRJ_t98tnANx2bjxV3GBG64S37aUVPA&oe=67B836BE"
            alt="User Avatar"
            className="w-11 h-11 rounded-full"
          />
        </div>
      </div>

      {/* Nút lọc trạng thái */}
      <div className="flex space-x-4 px-10 mb-4">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilter("waiting")}
          className="px-4 py-2 rounded bg-orange-500 text-white"
        >
          Yêu cầu thanh toán
        </button>
        <button
          onClick={() => setFilter("paid")}
          className="px-4 py-2 rounded bg-green-500 text-white"
        >
          Đã thanh toán
        </button>
        <button
          onClick={() => setFilter("systemWaiting")}
          className="px-4 py-2 rounded bg-yellow-500 text-white"
        >
          Hệ thống chờ thanh toán
        </button>
      </div>

      {/* Bảng giao dịch */}
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
            {filteredData.map((shop) => (
              <tr key={shop.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-4">{shop.id}</td>
                <td className="px-3 py-4">{shop.shopName}</td>
                <td className="px-3 py-4">{shop.amount}</td>
                <td className="px-3 py-4">{shop.bankName}</td>
                <td className="px-3 py-4">{shop.accountNumber}</td>
                <td className="px-3 py-4">
                  <button
                    onClick={() =>
                      shop.status === 1 ? openModal(shop.id) : null
                    }
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusMap[shop.status].color
                    } ${
                      shop.status === 3 ? "cursor-default" : "hover:opacity-80"
                    }`}
                    disabled={shop.status === 3}
                  >
                    {statusMap[shop.status].label}
                  </button>
                </td>
                <td className="px-3 py-4">
                  {shop.paymentTime ? shop.paymentTime : "__"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
