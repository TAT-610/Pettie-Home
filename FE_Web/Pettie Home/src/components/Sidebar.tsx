import React, { useEffect, useState } from "react";
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
    heading: "Người dùng",
    href: "/admin/nguoidung",
  },
  {
    icon: FaStore,
    heading: "Cửa Hàng",
    href: "/admin/cuahang",
    children: [
      {
        icon: TbShoppingCartCopy,
        heading: "Xét Duyệt Cửa Hàng",
        href: "/admin/xetduyetCuahang",
      },
    ],
  },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>(window.location.pathname);

  useEffect(() => {
    // Update active link on page load or URL change
    setActive(window.location.pathname);
  }, []);

  const handleNavigation = (href: string) => {
    setActive(href);
    window.location.href = href; // Navigate to the clicked page
  };

  return (
    <div className="w-64 h-screen bg-[#699BF4] shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="m-auto px-6 py-5">
        <img
          src="/src/assets/logotest.png"
          alt="Logo"
          className="w-45 h-20"
        />
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
                    ? "bg-white text-green-900"
                    : "text-white hover:text-green-900 hover:bg-white"
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
                            ? "bg-white text-green-900"
                            : "text-white hover:text-green-900 hover:bg-white"
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
        <button className="flex items-center text-sm font-medium text-white hover:text-red-500 hover:bg-[#37cecc] rounded-lg px-4 py-2 w-full">
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
