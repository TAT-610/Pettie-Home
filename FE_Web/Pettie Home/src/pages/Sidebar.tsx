import React from "react";
import { FaChartBar, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { TbShoppingCartCopy } from "react-icons/tb";

interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}

const SidebarData: SidebarDataType[] = [
  {
    icon: FaChartBar,
    heading: "Thống kê",
    href: "/admin/thongke",
  },
  {
    icon: FaUsers,
    heading: "Khách Hàng",
    href: "/admin/khachhang",
  },
  {
    icon: FaStore,
    heading: "Cửa Hàng",
    href: "/admin/cuahang",
    children: [
      {
        icon: TbShoppingCartCopy ,
        heading: "Xét Duyệt Cửa Hàng",
        href: "/admin/xetduyetCuahang",
      },
    ],
  },
  
];

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <img
          src="src/assets/pawprint.png" 
          alt="Logo"
          className="w-10 h-10"
        />
        <div className="ml-4">
          <h1 className="text-lg font-bold">Petite Home</h1>
          <p className="text-sm text-gray-500">Tiện lợi cho bạn, thoải mái cho pet</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          {SidebarData.map((item) => (
            <li key={item.heading}>
              {/* Main Navigation Link */}
              <a
                href={item.href}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-green-900 hover:bg-[#37cecc] rounded-lg px-4 py-2"
              >
                <div className="mr-3 text-lg">
                  <item.icon />
                </div>
                {item.heading}
              </a>

              {/* Sub-navigation (if any) */}
              {item.children && (
                <ul className="pl-6 space-y-2 mt-2">
                  {item.children.map((subItem) => (
                    <li key={subItem.heading}>
                      <a
                        href={subItem.href}
                        className="flex items-center text-sm font-medium text-gray-600 hover:text-green-900 hover:bg-[#37cecc] rounded-lg px-4 py-2"
                      >
                        <div className="mr-3 text-lg">
                          <subItem.icon />
                        </div>
                        {subItem.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="px-4 py-6">
        <button className="flex items-center text-sm font-medium text-[#00b9bb] hover:text-red-500 hover:bg-[#37cecc] rounded-lg px-4 py-2 w-full">
          <div className="mr-3 text-lg">
            <FaSignOutAlt />
          </div>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
