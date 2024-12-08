import React from "react";
import { FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center font-bold text-xl border-b border-gray-700">
      <Image
        src="/logo.png"
        alt="Logo"
        width={64}
        height={64}
        className="mx-auto mb-2 rounded-full border-2 border-gray-600"
        />
        Admin Panel
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          <li className="p-4 hover:bg-gray-700 flex items-center transition-all duration-300">
            <FaUsers className="mr-3 text-xl" />
            <Link href="/admin/user" className="block text-base">
                Users
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center transition-all duration-300">
            <FaClipboardList className="mr-3 text-xl" />
            <Link href="/admin/absensi" className="block text-base">
                Absensi
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
