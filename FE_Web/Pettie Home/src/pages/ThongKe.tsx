import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ThongKe = () => {
  const fakeData = [
    { title: "Orders", value: "$35,485", change: "+2.8%" },
    { title: "Avg. Order Amount", value: "$8,562", change: "-2.1%" },
    { title: "Unique Customers", value: "15,235", change: "+3.2%" },
    { title: "Net Sales", value: "$9,584", change: "-1.5%" },
  ];

  const salesData = [
    { day: "Tue", income: 120, expense: 80 },
    { day: "Wed", income: 150, expense: 90 },
    { day: "Thu", income: 180, expense: 120 },
    { day: "Fri", income: 250, expense: 150 },
    { day: "Sat", income: 300, expense: 180 },
    { day: "Sun", income: 270, expense: 200 },
    { day: "Mon", income: 320, expense: 240 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-lg w-1/3"
        />
        <div className="flex items-center space-x-4">
          <p className="font-bold">Today</p>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {fakeData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md flex flex-col"
          >
            <p className="text-gray-500">{item.title}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
            <p
              className={`text-sm ${item.change.includes("+") ? "text-green-500" : "text-red-500"
                }`}
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Sales Analytics Section */}
      <div className="grid grid-cols-1 gap-4">
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4">Sales Analytics</h3>
          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" />
              <Line type="monotone" dataKey="expense" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
