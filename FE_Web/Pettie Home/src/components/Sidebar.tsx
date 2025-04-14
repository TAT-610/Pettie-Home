import React, { useEffect, useState } from "react";
import { FaChartBar, FaUsers, FaStore, FaSignOutAlt } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import { TbShoppingCartCopy } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

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
    heading: "Quản lí người dùng",
    href: "/admin/nguoidung",
  },
  {
    icon: FaMoneyBillTransfer,
    heading: "Quản lí giao dịch",
    href: "/admin/giaodich",
  },
  {
    icon: FaStore,
    heading: "Quản lí cửa hàng",
    href: "/admin/cuahang",
    children: [
      {
        icon: TbShoppingCartCopy,
        heading: "Xét duyệt cửa Hàng",
        href: "/admin/xetduyetCuahang",
      },
    ],
  },
  {
    icon: FaStore,
    heading: "Danh mục sản phẩm",
    href: "/admin/danhmuc",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>(window.location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    // Update active link on page load or URL change
    setActive(window.location.pathname);
  }, []);

  const handleNavigation = (href: string) => {
    setActive(href);
    window.location.href = href; // Navigate to the clicked page
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-[#699BF4] shadow-lg flex flex-col">
      {/* Logo Section */}
      <div className="mx-auto px-6 mt-12">
        <img src="/src/assets/logotest.png" alt="Logo" className="w-45 h-20" />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-4">
          {SidebarData.map((item) => (
            <li key={item.heading}>
              {/* Main Navigation Link */}
              <div
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center text-sm font-medium rounded-lg px-4 py-2 cursor-pointer ${
                  active === item.href
                    ? "bg-white text-[#ed7c44]"
                    : "text-white hover:text-[#ed7c44] hover:bg-white"
                }`}
              >
                <div className="mr-3 text-lg">
                  <item.icon />
                </div>
                {item.heading}
              </div>

              {/* Sub-navigation (if any) */}
              {item.children && (
                <ul className="pl-6 space-y-2 mt-2">
                  {item.children.map((subItem) => (
                    <li key={subItem.heading}>
                      <div
                        onClick={() => handleNavigation(subItem.href)}
                        className={`flex items-center text-sm font-medium rounded-lg px-4 py-2 cursor-pointer ${
                          active === subItem.href
                            ? "bg-white text-[#ed7c44]"
                            : "text-white hover:text-[#ed7c44] hover:bg-white"
                        }`}
                      >
                        <div className="mr-3 text-lg">
                          <subItem.icon />
                        </div>
                        {subItem.heading}
                      </div>
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
        <button
          className="flex items-center text-sm font-medium text-white hover:text-red-500 hover:bg-[#37cecc] rounded-lg px-4 py-2 w-full"
          onClick={handleLogout}
        >
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
