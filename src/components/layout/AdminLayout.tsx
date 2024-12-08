/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Sidebar from "@/components/layout/Sidebar"; // Menggunakan komponen Sidebar

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-lg">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
