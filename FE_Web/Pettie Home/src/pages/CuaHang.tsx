import { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialStores = [
  {
    id: 1,
    shopName: "Tiệm Nhà Bụp",
    phone: "0901234567",
    address: "53a Đặng Văn Bi, Trường Thọ, Thủ Đức, Hồ Chí Minh 71300",
    revenue: 3340000,
    status: true,
  },
  {
    id: 2,
    shopName: "Spa tại nhà Juddy",
    phone: "0912345678",
    address: "02 Hòa Bình, Bình Thọ, Thủ Đức, Hồ Chí Minh",
    revenue: 930000,
    status: false,
  },
  {
    id: 3,
    shopName: "Pet Shop Thủ Đức",
    phone: "0923456789",
    address: "27a Đ. Số 5, Linh Xuân, Thủ Đức, Hồ Chí Minh",
    revenue: 2055000,
    status: true,
  },
  {
    id: 4,
    shopName: "Tắm rữa thú cưng Sephera",
    phone: "0934567890",
    address: "447E Lê Văn Việt, p, Quận 9, Hồ Chí Minh 700000",
    revenue: 1388000,
    status: true,
  },
  {
    id: 5,
    shopName: "Thế giới thú cưng Quin quin",
    phone: "0945678901",
    address: "62B Hòa Bình, Phường 5, Quận 11, Hồ Chí Minh 700000",
    revenue: 2440000,
    status: false,
  },
  {
    id: 6,
    shopName: "Pet Mart Quận 9",
    phone: "0956789012",
    address: "5 Đ. Số 8, Linh Chiểu, Thủ Đức, Hồ Chí Minh 71300",
    revenue: 1388000,
    status: true,
  },
  {
    id: 7,
    shopName: "Pet mart nhà Tharo",
    phone: "0967890123",
    address: "62B Hòa Bình, Phường 5, Quận 11, Hồ Chí Minh 700000",
    revenue: 300000,
    status: false,
  },
];

const CuaHang = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState(initialStores);
  const navigate = useNavigate();

  useEffect(() => {
    const approvedStores = JSON.parse(
      localStorage.getItem("approvedStores") || "[]"
    );
    setStores((prevStores) => [...initialStores, ...approvedStores]);
  }, []);

  const filteredStores = stores.filter((store) =>
    store.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#EDF2F9] h-full">
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Quản lí cửa hàng
          </span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm cửa hàng..."
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

      <div className="overflow-x-auto bg-white shadow-md rounded-lg mx-10">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-[4%]">ID</th>
              <th className="px-2 py-3  w-[16%]">Tên cửa hàng</th>
              <th className="px-2 py-3 w-[10%]">Số điện thoại</th>
              <th className="px-2 py-3 w-[27%]">Địa chỉ</th>
              <th className="px-2 py-3 w-[12%]">Tổng doanh thu</th>
              <th className="px-2 py-3 w-[12%]">Doanh thu đem lại</th>
              <th className="px-2 py-3 w-[11%]">Trạng thái</th>
              <th className="px-2 py-3 w-[8%]">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((store) => (
              <tr
                key={store.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-4">{store.id}</td>
                <td className="px-2 py-4">{store.shopName}</td>
                <td className="px-2 py-4">{store.phone}</td>
                <td className="px-2 py-4">{store.address}</td>
                <td className="px-2 py-4">
                  {store.revenue.toLocaleString()} VND
                </td>
                <td className="px-2 py-4">
                  {(store.revenue * 0.18).toLocaleString()} VND
                </td>
                <td
                  className={`px-4 py-4 ${
                    store.status ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {store.status ? "Hoạt động" : "Đóng cửa"}
                </td>
                <td className="px-2 py-4">
                  <button
                    onClick={() => navigate(`/store/${store.id}`)}
                    className="px-1 py-1  text-blue-500 rounded-lg hover:border-2 hover:border-blue-500"
                  >
                    Xem thêm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
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

export default CuaHang;
