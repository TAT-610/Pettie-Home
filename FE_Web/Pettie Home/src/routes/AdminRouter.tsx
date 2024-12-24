import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Sidebar from '../pages/Sidebar';
import XetduyetCuaHang from '../pages/XetduyetCuaHang';
import CuaHang from '../pages/CuaHang';
import KhachHang from '../pages/KhachHang';
import ThongKe from '../pages/ThongKe';

export default function App() {
  return (
    <Router>
      <Routes><Route path="/" element={<Login />} /></Routes>
      <div className="flex">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/admin/thongke" element={<ThongKe />} />
            <Route path="/admin/khachhang" element={<KhachHang />} />
            <Route path="/admin/cuahang" element={<CuaHang />} />
            <Route path="/admin/xetduyetCuahang" element={<XetduyetCuaHang />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
