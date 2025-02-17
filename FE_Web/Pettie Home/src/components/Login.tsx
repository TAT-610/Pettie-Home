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
    <div className="flex justify-between min-h-screen bg-[#699BF4] login-container">
      {/* <div className="flex flex-col items-center text-center max-w-md w-full"> */}
      {/* Logo */}
      <div className="w-2/3 flex flex-col items-center justify-center pb-20">
        <img
          src="src/assets/logotest.png"
          alt="LogoLogo"
          className="w-56 h-auto  "
        />
        <div className="text-white text-lg font-semibold font-roboto">
          Tiện Lợi Cho Bạn, Thoải Mái Cho Pet
        </div>
        <div className="bg-white rounded-lg  mt-8 p-10 flex flex-col">
          <div className="text-xl font-bold text-center mb-8">Đăng Nhập</div>

          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4 px-4 py-2 rounded-lg text-slate-800 w-[400px]  border-2 border-slate-300"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 px-4 py-2 rounded-lg text-black  w-[400px]  border-2 border-slate-300 "
          />
          <button
            className="px-5 py-3 bg-[#ed7c44] text-white text-base font-semibold rounded-full hover:bg-[#ff8c57] transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <img src="src/assets/bg.jpg" alt="LogoLogo" className="w-auto h-auto " />
    </div>
  );
}
