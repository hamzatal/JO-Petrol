import React, { useState, useEffect } from "react";
import { Fuel, User, Mail, Loader } from "lucide-react";
import axios from "axios";

const WelcomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/users');
                if (response.data.success) {
                    setUsers(response.data.data);
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header بسيط */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-600 to-emerald-600 p-4 rounded-2xl">
                            <Fuel className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-black text-white">
                            JO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Petrol</span>
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Users Database - Total: <span className="text-blue-400 font-bold text-2xl">{users.length}</span>
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <Loader className="w-16 h-16 text-blue-500 mx-auto animate-spin mb-4" />
                        <p className="text-gray-300 text-xl">Loading data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-2xl mx-auto bg-red-500/20 border-2 border-red-500 rounded-2xl p-8 text-center">
                        <p className="text-red-400 font-bold text-xl">Error: {error}</p>
                    </div>
                )}

                {/* عرض البيانات في جدول */}
                {!loading && !error && users.length > 0 && (
                    <div className="bg-slate-800/50 backdrop-blur-md border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-600/30 to-emerald-600/30 border-b border-blue-400/30">
                                        <th className="px-6 py-4 text-left text-sm font-black text-blue-300 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-black text-blue-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-black text-blue-300 uppercase tracking-wider">
                                            Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-400/10">
                                    {users.map((user, index) => (
                                        <tr 
                                            key={user.id}
                                            className="hover:bg-blue-500/10 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/20 text-blue-400 font-bold rounded-lg">
                                                    {user.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <span className="text-white font-semibold text-lg">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Mail className="w-5 h-5 text-blue-400" />
                                                    <span>{user.email}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && users.length === 0 && (
                    <div className="text-center py-20">
                        <User className="w-24 h-24 text-blue-400/30 mx-auto mb-6" />
                        <p className="text-gray-400 text-2xl font-semibold">No users found in database</p>
                    </div>
                )}

                {/* Footer بسيط */}
                <div className="text-center mt-12 text-gray-500 text-sm">
                    <p>© 2026 JO Petrol. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
