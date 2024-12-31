import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const stores = [
  { id: 1, shopName: "Clarke Pitts", status: "Pending", price: 50 },
  { id: 2, shopName: "Haven Essentials", status: "Pending", price: 75 },
  { id: 3, shopName: "Paws & Claws", status: "Pending", price: 120 },
  { id: 4, shopName: "Pets Paradise", status: "Pending", price: 95 },
];

const XetDuyetCuaHang = () => {
  const [storeData, setStoreData] = useState(stores);

  const handleApprove = (id: number) => {
    setStoreData(prevState =>
      prevState.map(store =>
        store.id === id ? { ...store, status: "Approved" } : store
      )
    );
  };

  const handleReject = (id: number) => {
    setStoreData(prevState =>
      prevState.map(store =>
        store.id === id ? { ...store, status: "Rejected" } : store
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-24">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Tìm kiếm ....."
            className="border border-gray-300 rounded-lg px-4 py-2 w-96"
          />
        </div>
        {/* Avatar at the top-right corner */}
        <div className="absolute top-4 right-4">
          <img
            src="/src/assets/user.png"
            alt="User"
            className="w-10 h-10 rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Store Approval Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg m-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="bg-[#699BF4] text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên cửa hàng</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((store) => (
              <tr key={store.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="px-4 py-3">{store.id}</td>
                <td className="px-4 py-3">{store.shopName}</td>
                <td className="px-4 py-3">
                  {/* Conditional styling for status */}
                  <span
                    className={`${
                      store.status === "Approved"
                        ? "text-green-500"
                        : store.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {store.status}
                  </span>
                </td>
                <td className="px-4 py-3">{store.price} USD</td>
                <td className="px-4 py-3 flex items-center space-x-4">
                  {/* Approve Button */}
                  {store.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(store.id)}
                      className="text-green-500 hover:text-green-700 text-lg"
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                  {/* Reject Button */}
                  {store.status === "Pending" && (
                    <button
                      onClick={() => handleReject(store.id)}
                      className="text-red-500 hover:text-red-700  text-lg"
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default XetDuyetCuaHang;
