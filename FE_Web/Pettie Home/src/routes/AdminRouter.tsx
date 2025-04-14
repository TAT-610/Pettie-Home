import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import XetduyetCuaHang from "../pages/XetduyetCuaHang";
import CuaHang from "../pages/CuaHang";
import NguoiDung from "../pages/NguoiDung";
import ThongKe from "../pages/ThongKe";
import GiaoDich from "../pages/GiaoDich";
import DetailShop from "../pages/DetailShop";
import Danhmuc from "../pages/Danhmuc";

export default function AdminRouter() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="thongke" element={<ThongKe />} />
          <Route path="nguoidung" element={<NguoiDung />} />
          <Route path="cuahang" element={<CuaHang />} />
          <Route path="xetduyetCuahang" element={<XetduyetCuaHang />} />
          <Route path="giaodich" element={<GiaoDich />} />
          <Route path="cuahang/detailshop" element={<DetailShop />} />
          <Route path="danhmuc" element={<Danhmuc />} />
        </Routes>
      </div>
    </div>
  );
}
