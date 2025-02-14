import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Tài khoản giả
  const fakeAccount = {
    phone: "0886133779",
    password: "123456",
  };

  const handleLogin = async () => {
    if (phone === fakeAccount.phone && password === fakeAccount.password) {
      console.log("Đăng nhập thành công");
      navigate("/admin/thongke");
    } else {
      alert("Số điện thoại hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#699BF4] text-white px-4">
      {/* Content Section */}
      <div className="flex flex-col items-center text-center max-w-md w-full">
        {/* Logo */}
        <img
          src="src/assets/logotest.png"
          alt="LogoLogo"
          className="w-auto h-auto mb-5"
        />

        {/* Text */}
        <p className="text-2xl mb-6">
          Nơi cung cấp các dịch vụ cho thú cưng tại nhà
        </p>

        {/* Phone Input */}
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4 px-4 py-2 rounded-lg text-black"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 px-4 py-2 rounded-lg text-black"
        />

        {/* Login Button */}
        <button
          className="px-6 py-3 bg-[#ed7c44] text-lg font-semibold rounded-full hover:bg-[#ff8c57] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
