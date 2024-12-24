import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("CHuyen trang");
    navigate('/admin');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00b9bb] text-white px-4">

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
