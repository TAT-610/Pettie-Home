import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaSearch, FaBell, FaBox, FaUsers } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { RiHomeHeartFill } from "react-icons/ri";
import { GiTrophyCup } from "react-icons/gi";

const shop = [
  {
    id: 1,
    name: "Tiệm nhà Bụp",
    income: "600",
    avatar:
      "https://i.pinimg.com/474x/7f/78/37/7f783761231551f96aadbaece6e7e1d9.jpg",
  },
  {
    id: 2,
    name: "Thế giới thú cưng Quin quin",
    income: "440",
    avatar:
      "https://i.pinimg.com/736x/6c/ed/df/6ceddf366988007afff55079d9a6a6c7.jpg",
  },
  {
    id: 3,
    name: "Pet shop Thủ Đức",
    income: "370",
    avatar:
      "https://i.pinimg.com/736x/5e/ac/7e/5eac7e0c084cabfde8733aa1a7bdffec.jpg",
  },
  {
    id: 4,
    name: "Spa tại nhà Juddy",
    income: "320",
    avatar:
      "https://i.pinimg.com/736x/ab/52/1d/ab521d5f94b0d391bf9018c4eefd297d.jpg",
  },
  {
    id: 5,
    name: "Pet Mart quận 9",
    income: "250",
    avatar:
      "https://i.pinimg.com/736x/ac/df/80/acdf808d2132658c9fa834aca6837359.jpg",
  },
  {
    id: 6,
    name: "Tắm rữa thú cưng Sephera",
    income: "250",
    avatar:
      "https://i.pinimg.com/736x/1d/9a/22/1d9a22fab06290a3d90c08a902f5377f.jpg",
  },
];

const ThongKe = () => {
  const fakeData = [
    {
      title: "Tổng doanh thu",
      value: "3.400.000",
      change: "+2.8%",
      icon: GrMoney,
      color: "#FF947A",
    },
    {
      title: "Tổng đơn hàng",
      value: "17",
      change: "-2.1%",
      icon: FaBox,
      color: "#3CD856",
    },
    {
      title: "Số lượng người dùng",
      value: "24",
      change: "+3.2%",
      icon: FaUsers,
      color: "#FA5A7D",
    },
    {
      title: "Số lượng shop thú cưng",
      value: "7",
      change: "-1.5%",
      icon: RiHomeHeartFill,
      color: "#BF83FF",
    },
  ];

  const salesData = [
    { day: "Thứ 3", income: 0, expense: 200 },
    { day: "Thứ 4", income: 250, expense: 100 },
    { day: "Thứ 5", income: 100, expense: 100 },
    { day: "Thứ 6", income: 0, expense: 120 },
    { day: "Thứ 7", income: 300, expense: 100 },
    { day: "Chủ Nhật", income: 580, expense: 100 },
    { day: "Thứ 2", income: 320, expense: 120 },
  ];

  // Hàm formatter để thay đổi nhãn
  const tooltipFormatter = (value: number, name: string) => {
    switch (name) {
      case "income":
        return [`${value}.000 VND`, "Thu nhập"];
      case "expense":
        return [`${value}.000 VND`, "Chi phí"];
      default:
        return [value, name];
    }
  };

  return (
    <div className="bg-[#EDF2F9] h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between py-3 px-8 bg-slate-50 items-center mb-6 shadow-sm">
        <div className="relative w-1/2 flex items-center space-x-2">
          <span className="font-bold font-sans text-xl text-gray-600 mr-10">
            Thống kê
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

      {/* Overview Section */}
      <div className="grid grid-cols-4 gap-8 px-8">
        {fakeData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md flex items-center"
          >
            <div
              className="flex-shrink-0 w-20 h-full rounded-tl-lg rounded-bl-lg flex items-center justify-center"
              style={{ backgroundColor: item.color }}
            >
              <item.icon className="text-3xl text-white" />
            </div>
            <div className="ml-4 py-2 ">
              <p className="text-gray-600 font-sans font-semibold">
                {item.title}
              </p>
              <h2 className="text-xl font-bold">{item.value}</h2>
              <p
                className={`text-sm ${
                  item.change.includes("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Analytics Section */}
      <div className="flex p-8">
        <div className="col-span-2 w-2/3 bg-white rounded-lg py-5 pr-7 shadow-md">
          <h3 className="text-lg ml-7 font-sans font-bold mb-4">
            Sơ đồ doanh thu trong tuần
          </h3>
          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={salesData}
              margin={{ top: 40, right: 20, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis
                label={{
                  value: "(nghìn VND)",
                  angle: 0,
                  position: "top",
                  dy: -20,
                  dx: 25,
                }}
              />
              <Tooltip formatter={tooltipFormatter} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#82ca9d"
                strokeWidth={3}
                name="Thu nhập"
                className="mt-10"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#8884d8"
                strokeWidth={3}
                name="Chi phí"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/3 ml-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center my-5 pt-3 text-lg font-semibold">
            <div className="text-yellow-500 text-xl mr-1">
              <GiTrophyCup />
            </div>
            <div>Xếp hạng doanh thu các shop</div>
          </div>
          <div className="px-6 w-full">
            {shop.map((s, index) => (
              <div
                key={s.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1 ml-4 pr-2">
                  <p className="font-medium">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{s.income}.000 VND</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
