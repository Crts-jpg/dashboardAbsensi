/* eslint-disable @typescript-eslint/no-unused-vars */
import AdminLayout from "@/components/layout/AdminLayout";
import React, { useEffect, useState } from "react";
import { getAllUser } from "@/services/userService";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import type { User } from '@/services/userService';

const User = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleDeleteUser = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
          try {
            await axios.delete(`/users/${id}`);
            // Perbarui data setelah penghapusan berhasil
            fetchData();
          } catch (error) {
            alert('Gagal menghapus pengguna.');
          }
        }
      };
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUser();
                console.log('Response:', response); // Debug response
                setUsers(response.users || []); // Ambil properti 'users'
            } catch (err) {
                console.error('Error fetching user data:', err.message);
                setError('Terjadi kesalahan saat mengambil data pengguna');
            }
        };        

        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        <AdminLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Dashboard Absensi Bluetooth</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Total Pengguna</h2>
                        <p className="text-gray-700 text-3xl">{users.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Kehadiran Hari Ini</h2>
                        <p className="text-gray-700 text-3xl">{users.filter(user => user.attendanceDate === today).length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Total Kehadiran</h2>
                        <p className="text-gray-700 text-3xl">{users.reduce((acc, user) => acc + user.attendanceCount, 0)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Pengguna Aktif</h2>
                        <p className="text-gray-700 text-3xl">{users.filter(user => user.active).length}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Daftar Kehadiran Hari Ini</h2>
                <table className="w-full bg-white shadow-md rounded overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Nama</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Waktu Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.filter(user => user.attendanceDate === today).map((user: User) => (
                            <tr key={user.id} className="border-t">
                                <td className="p-4">{user.id}</td>
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.attendanceTime}</td>
                                <td className="p-4">
                                    <button onClick={() => handleDeleteUser(user.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default User;

function fetchData() {
    throw new Error("Function not implemented.");
}
