import { useNavigate } from "react-router-dom";
import { FaBell, FaCircle, FaStar } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Orders from "../components/order";

console.log(Orders); // Kiểm tra dữ liệu đơn hàng

export interface Store {
  id: number;
  shopName: string;
  phone: string;
  address: string;
  revenue: number;
  status: boolean;
  income: number | null;
  avatar: string | null;
  description: string | null;
  name: string | null;
}
interface Order {
  id: number;
  id_customer: number;
  name: string;
  phone: string;
  price: number;
}
export default function DetailShop() {
  const navigate = useNavigate();

  // Default shop information
  const shop = {
    shopName: "MiuGauu",
    owner: "Trần Ánh Tuyết",
    phone: "0938752456",
    address: "1827/4 Nguyễn Duy Trinh, Trường Thạnh, Quận 9, Thủ Đức",
    revenue: 650000,
    income: 650000 * 0.1,
    status: true,
    bankName: "Sacombank",
    bankAccountNumber: "050130830320",
    description:
      "Chào Sen nhen! Rất vui vì Sen ghé qua MiuGau, hãy để tụi mình mang đến những dịch vụ tốt nhất cho Boss của mấy Sen nhaa!!",
    avatar:
      "https://i.pinimg.com/736x/af/df/cd/afdfcdcce5080bef00d8d0ab28cc4774.jpg",
    rating: 4.8,
  };

  return (
    <div className="bg-[#EDF2F9] h-full overflow-auto">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 sticky top-0 z-10 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <button onClick={() => navigate(`/admin/cuahang`)}>
            <span className="font-bold font-sans text-xl text-gray-600 mr-10 flex items-center">
              <IoMdArrowRoundBack /> Quay lại quản lí cửa hàng
            </span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center">
            <FaBell className="text-[#ed7c44] text-2xl" />
          </div>
          <img
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/298262371_1454849461693251_7497615639064788636_n.jpg?stp=dst-jpg_p160x160_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=64UxNzNqi9wQ7kNvgHOFhZF&_nc_oc=AdmjE1LjqoYNUgR2FLa2l_yhOWrq2YGDXPMRbdmdjeNmRHddqE2DvmIaAEfAdebUkbg&_nc_zt=24&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=56Iu-DIH-0ucjmBiKEaIZQ&oh=00_AYECDTrL9bZ1wDYqBEPXvvar8ShzXHneaBVRth0hBacwEg&oe=67EE3640"
            alt="User Avatar"
            className="w-11 h-11 rounded-full"
          />
        </div>
      </div>

      {/* Shop Details */}
      <div className="bg-white rounded-lg mx-10 py-8 px-10 flex">
        <div className="w-96 h-96">
          <img
            src={shop.avatar}
            alt={shop.shopName}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="mx-10 flex-1">
          <p className="text-3xl mb-5">
            <strong>{shop.shopName}</strong>
          </p>
          <div className="flex w-full mb-3 justify-between">
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Chủ cửa hàng:</p>
              <p className="font-sans font-semibold">{shop.owner}</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Số điện thoại:</p>
              <p>{shop.phone}</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Trạng thái:</p>
              <p className="font-sans flex items-center gap-2 text-center font-semibold bg-green-300 text-green-800 rounded-xl px-3 py-1 text-sm w-fit">
                <FaCircle className="text-xs" />
                {shop.status ? "Hoạt động" : "Đóng cửa"}
              </p>
            </div>
          </div>
          <div className="flex w-full mb-3 justify-between">
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Tổng doanh thu:</p>
              <p className="font-sans font-semibold">
                {shop.revenue.toLocaleString()} VND
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Doanh thu mang lại:</p>
              <p>{shop.income.toLocaleString()} VND</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Đánh giá:</p>
              <div className="flex">
                <FaStar className="mr-2 text-yellow-500 text-lg" />
                <p>{shop.rating}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full mb-3">
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Ngân hàng:</p>
              <p className="font-sans font-semibold">{shop.bankName}</p>
            </div>
            <div className="w-1/3">
              <p className="text-gray-500 font-medium">Số tài khoản:</p>
              <p>{shop.bankAccountNumber}</p>
            </div>
          </div>
          <div className="flex">
            <p className="text-gray-500 font-medium">Địa chỉ:</p>
            <p className="font-sans font-medium ml-1">{shop.address}</p>
          </div>
          <div className="mt-3">
            <p className="text-gray-500 font-medium">Giới thiệu:</p>
            <p className="font-sans font-medium">{shop.description}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg mx-10 py-8 px-10 mt-5 mb-8">
        <div className="text-center font-sans font-semibold text-lg mb-4">
          Thông tin các đơn hàng
        </div>
        <div className="shadow-md rounded-md">
          <table className=" text-sm text-left rounded-md w-full px-4 text-gray-500">
            <thead className="bg-[#699BF4] text-white uppercase text-xs rounded-t-md">
              <tr>
                <th className="px-3 py-3">ID đơn hàng</th>
                <th className="px-3 py-3">ID khách hàng</th>
                <th className="px-3 py-3">Tên khách hàng</th>
                <th className="px-3 py-3">Số điện thoại</th>
                <th className="px-3 py-3">Giá trị đơn hàng</th>
                <th className="px-3 py-3">Doanh thu hệ thống</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order: Order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-3 py-3">{order.id}</td>
                  <td className="px-3 py-3">{order.id_customer}</td>
                  <td className="px-3 py-3">{order.name}</td>
                  <td className="px-3 py-3">{order.phone}</td>
                  <td className="px-3 py-3">
                    {order.price.toLocaleString()}.000 VND
                  </td>
                  <td className="px-3 py-3">
                    {(order.price * 0.18 * 1000).toLocaleString()} VND
                    {/* Cập nhật giá trị hiển thị */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
