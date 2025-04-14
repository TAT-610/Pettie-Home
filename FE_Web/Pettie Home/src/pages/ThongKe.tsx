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
    name: "Mesmeomeo",
    income: "3.410",
    avatar:
      "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/331927170_1255538045380860_3619882846865462020_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF-XV4w7c1xqeImHe229TtEvTauxWvJsfy9Nq7Fa8mx_EsPsBreIDsHcvrmVUZLZiw4U7UE0ltfVJj1stBCCFta&_nc_ohc=LewDBLnDppsQ7kNvwHyVXzs&_nc_oc=Adl3kuW9O1GQff4wOfNz5TBj_BIv7eJdT73sh1_BPRJ6gG3kTHaLCbSyEa0R2lNiKZgzb7_PNP9hmYyCsPmUzY7R&_nc_zt=23&_nc_ht=scontent.fsgn13-2.fna&_nc_gid=QtHjcERX5jIFc4lfLqrSlQ&oh=00_AfGVpDWeKBtC8Av8x5nbiU9nzS9q6k122rjDFmuiXVn1zA&oe=67F88AF4",
  },
  {
    id: 2,
    name: "Pet Want",
    income: "2.020",
    avatar:
      "https://scontent.fsgn24-2.fna.fbcdn.net/v/t39.30808-6/292478853_190638156651811_5630531594611378651_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEtis0hBfi8aRiro28c8hJQspT3OFgmDMyylPc4WCYMzJZugWLrN2KOaUXKxydKgRXNz9EaemnMVnUqvKqyhsjo&_nc_ohc=pp-BLOEYR3UQ7kNvwHZPyXQ&_nc_oc=Adn9Vbfsqmk1A4kQCXd23oBgG346tVNdt4bZfurXX6AWnbTQd8C9X7YbWu5Hl4Cxo4jWyKLPUT-ctIolaQcoWRnh&_nc_zt=23&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=cwd4xIx7YPO6ulCUJKHWtA&oh=00_AfGm29Ie-ltLLXOu6z_C-rXLqxD6jXEVxuwjzrznMsGiXQ&oe=67F885E1",
  },
  {
    id: 3,
    name: "VietNam Vet Clinic",
    income: "1.740",
    avatar:
      "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/305117335_381112410875432_7271808005355689381_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeECpXM9HoeaY25uN-5IWOxb-4eABbYFJ6X7h4AFtgUnpf0PG3C2z8ZhInP9drzGwFZQL87HSv2EYT4848BPVfcW&_nc_ohc=2hG-gEDrLYoQ7kNvwFzAPoA&_nc_oc=AdnQMNoj1lCv8xG-TYYoYkgC5hHEFH3QyYuMyZVsXF7kNC2uscpma9p1xBMieTDYhm4e7CAujiI63qHj-2l0YMQA&_nc_zt=23&_nc_ht=scontent.fsgn4-1.fna&_nc_gid=KObCNdZNiXSP12ZijOnqaA&oh=00_AfGCGTr-XnrrW04sCLHxeSZxpxoR_6arh0K4oJL5gn-z_g&oe=67F88CCE",
  },
];

const ThongKe = () => {
  // Sort shop array by id in ascending order
  const sortedShop = [...shop].sort((a, b) => a.id - b.id);

  const fakeData = [
    {
      title: "Tổng doanh thu",
      value: "717.000",
      change: "+2.8%",
      icon: GrMoney,
      color: "#FF947A",
    },
    {
      title: "Tổng đơn hàng",
      value: "24",
      change: "+2.1%",
      icon: FaBox,
      color: "#3CD856",
    },
    {
      title: "Số lượng người dùng",
      value: "31",
      change: "-1.2%",
      icon: FaUsers,
      color: "#FA5A7D",
    },
    {
      title: "Số lượng shop thú cưng",
      value: "3",
      change: "+1.5%",
      icon: RiHomeHeartFill,
      color: "#BF83FF",
    },
  ];

  const salesData = [
    { day: "02/04", income: 780 },
    { day: "03/04", income: 1180 },
    { day: "04/04", income: 480 },
    { day: "05/04", income: 1440 },
    { day: "06/04", income: 340 },
    { day: "07/04", income: 380 },
    { day: "08/04", income: 0 },
  ];

  // Hàm formatter để thay đổi nhãn
  const tooltipFormatter = (value: number, name: string) => {
    switch (name) {
      case "income":
        return [`${value}.000 VND`, "Thu nhập"];

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
            src="https://scontent.fsgn24-2.fna.fbcdn.net/v/t39.30808-6/298262371_1454849461693251_7497615639064788636_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHIS2EWfaEKXzDZN0jYlSa5rE-BrKfZH_-sT4Gsp9kf_0yR1gdYdCUsbKDvfISZx7Tmz5fKhyZYpTW7EYSTyhUM&_nc_ohc=oKNrHcCyEEwQ7kNvwEMJJol&_nc_oc=AdkuMvYpOplO3nazEuJM5DDCf2EnecoxPnSvk0QbaCstVkUwULDjIqCYEQEtu7YbfINV6kRepsVNxLF49UABpRCh&_nc_zt=23&_nc_ht=scontent.fsgn24-2.fna&_nc_gid=j0PNrUNXUS1LuUkvrojZ_Q&oh=00_AfE_3l2HJR97dczONEEH0AVhAImqw7VFNp4QnuriRnUqTA&oe=67F897FE"
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
            Sơ đồ doanh thu
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
            {sortedShop.map((s) => (
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
