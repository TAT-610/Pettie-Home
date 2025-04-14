import { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllShops } from "../services/shops/api";
const prices = [3410000, 2020000, 1740000, 0, 0];

interface Shop {
  id: string;
  name: string;
  phone: string;
  address: string;
  averageRating: number;
  status: string;
}

const CuaHang = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Gọi API để lấy danh sách cửa hàng
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const dataData: Shop[] = await getAllShops();
        // Chỉ giữ lại các cửa hàng có trạng thái "Approved"
        const approvedShops = dataData.filter(
          (shop) => shop.status === "Approved"
        );
        setShops(approvedShops);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cửa hàng:", error);
        setShops([]);
      }
    };

    fetchStores();
  }, []);

  // Hàm xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lọc cửa hàng theo từ khóa tìm kiếm
  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.phone.includes(searchTerm) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#EDF2F9] min-h-screen overflow-auto relative">
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Quản lí cửa hàng
          </span>
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc địa chỉ..."
              className="px-10 py-3 text-sm rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center">
            <FaBell className="text-[#ed7c44] text-2xl" />
          </div>
          <img
            src="https://scontent.fsgn24-2.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=oKNrHcCyEEwQ7kNvwEMJJol&_nc_oc=AdkuMvYpOplO3nazEuJM5DDCf2EnecoxPnSvk0QbaCstVkUwULDjIqCYEQEtu7YbfINV6kRepsVNxLF49UABpRCh&_nc_zt=23&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=krD8zqx0kR8QbqqPwM1A3g&oh=00_AfERrxloTEltDxH6JgExbsBLG6V4l056LROf1D5b1DcUng&oe=67F897FE"
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
              <th className="px-2 py-3 w-[16%]">Tên cửa hàng</th>
              <th className="px-2 py-3 w-[10%]">Số điện thoại</th>
              <th className="px-2 py-3 w-[27%]">Địa chỉ</th>
              <th className="px-2 py-3 w-[12%]">Tổng doanh thu</th>
              <th className="px-2 py-3 w-[12%]">Doanh thu đem lại</th>
              <th className="px-2 py-3 w-[11%]">Trạng thái</th>
              <th className="px-2 py-3 w-[8%]">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center">
                  Không tìm thấy cửa hàng phù hợp.
                </td>
              </tr>
            ) : (
              filteredShops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-4">
                    #00{(index + 1).toLocaleString()}
                  </td>
                  <td className="px-2 py-4">{shop.name}</td>
                  <td className="px-2 py-4">{shop.phone}</td>
                  <td className="px-2 py-4">{shop.address}</td>
                  <td className="px-2 py-4">
                    {prices[index % prices.length].toLocaleString()} VND
                  </td>
                  <td className="px-2 py-4">
                    {(prices[index % prices.length] * 0.1).toLocaleString()} VND
                  </td>
                  <td
                    className={`px-4 py-4 ${
                      shop.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {shop.status === "Approved" ? "Hoạt động" : "Đóng cửa"}
                  </td>
                  <td className="px-2 py-4">
                    <button
                      onClick={() => navigate(`/admin/cuahang/detailshop`)}
                      className="px-1 py-1 text-blue-500 rounded-lg hover:border-2 hover:border-blue-500"
                    >
                      Xem thêm
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200">
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border-[#699BF4] border-2 rounded-md ${
                page === 1
                  ? "bg-[#699BF4] text-white"
                  : "text-[#699BF4] hover:bg-gray-200"
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
