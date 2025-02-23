import { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialStores = [
  {
    id: 10,
    name: "Phan Thục Quyên",
    shopName: "Clarke Pitt",
    phone: "0901234567",
    address: "45b Vân Côi, Phường 7, Tân Bình, Hồ Chí Minh",
    status: "Chờ xác nhận",
    price: 50,
  },
  {
    id: 11,
    name: "Trương Nữ Thùy Ngân",
    shopName: "Haven Pet Shop",
    phone: "0912345678",
    address: " 651 Lạc Long Quân, Phường 10, Tân Bình, Hồ Chí Minh 700000",
    status: "Từ chối",
    price: 75,
  },
  {
    id: 12,
    name: "Trần Công Tạo",
    shopName: "Pet Spa ParadosParados",
    phone: "0923456789",
    address: "62B Hòa Bình, Phường 5, Quận 11, Hồ Chí Minh",
    status: "Chờ xác nhận",
    price: 120,
  },
  {
    id: 13,
    name: "Ngô Nguyễn Cầm Thanh",
    shopName: "CuePie",
    phone: "0934567890",
    address: " 151 Lý Thường Kiệt, Phường 7, Quận 11, Hồ Chí Minh",
    status: "Từ chối",
    price: 95,
  },
];

const XetDuyetCuaHang = () => {
  const [storeData, setStoreData] = useState(() => {
    const approvedStores = JSON.parse(
      localStorage.getItem("approvedStores") || "[]"
    );
    return initialStores.filter(
      (store) => !approvedStores.some((approved) => approved.id === store.id)
    );
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const handleActionChange = (storeId, action) => {
    const store = storeData.find((store) => store.id === storeId);
    setSelectedStore(store);
    setSelectedAction(action);
    setModalVisible(true);
  };

  const confirmAction = () => {
    const updatedStores = storeData.filter((store) => {
      if (store.id === selectedStore.id) {
        if (selectedAction === "approve") {
          const approvedStores = JSON.parse(
            localStorage.getItem("approvedStores") || "[]"
          );
          approvedStores.push({
            ...store,
            revenue: 0,
            status: true,
          });
          localStorage.setItem(
            "approvedStores",
            JSON.stringify(approvedStores)
          );
          return false; // Loại bỏ cửa hàng đã chấp nhận khỏi danh sách
        } else {
          store.status = "Từ chối";
        }
      }
      return true;
    });
    setStoreData(updatedStores);
    setModalVisible(false);
  };

  const filteredStores = storeData.filter((store) =>
    store.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#EDF2F9] h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Cửa hàng mới
          </span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Store Approval Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-3 py-3">ID</th>
              <th className="px-3 py-3">Tên chủ cửa hàng</th>
              <th className="px-3 py-3">Tên cửa hàng</th>
              <th className="px-3 py-3">Số điện thoại</th>
              <th className="px-3 py-3">Địa chỉ</th>
              <th className="px-3 py-3">Trạng thái</th>
              <th className="px-33 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr
                key={store.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-3 py-3">{store.id}</td>
                <td className="px-3 py-3">{store.name}</td>
                <td className="px-3 py-3">{store.shopName}</td>
                <td className="px-3 py-3">{store.phone}</td>
                <td className="px-3 py-3">{store.address}</td>
                <td
                  className={`px-3 py-3 ${
                    store.status === "Chấp nhận"
                      ? "text-green-500"
                      : store.status === "Từ chối"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {store.status}
                </td>
                <td className="px-4 py-3">
                  <select
                    className="border border-gray-300 rounded-lg px-2 py-1"
                    onChange={(e) =>
                      handleActionChange(store.id, e.target.value)
                    }
                  >
                    <option value="">Chọn hành động</option>
                    <option value="approve">Chấp nhận</option>
                    <option value="reject">Từ chối</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Xác nhận hành động</h2>
            <p>
              Bạn có chắc chắn muốn{" "}
              {selectedAction === "approve" ? "chấp nhận" : "từ chối"} cửa hàng{" "}
              <strong>{selectedStore?.shopName}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={() => setModalVisible(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={confirmAction}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-5">
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
    </div>
  );
};

export default XetDuyetCuaHang;
