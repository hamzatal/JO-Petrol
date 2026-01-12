import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(true);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // جلب المستخدمين من قاعدة البيانات
    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users"); // خلينا نعمل route جديد API GET
            const data = await res.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/users", {
                method: "POST",
                headers: { "X-CSRF-TOKEN": csrfToken },
                body: new URLSearchParams(form),
            });

            if (!res.ok) throw new Error("Failed to create user");

            const newUser = await res.json();
            setUsers([newUser, ...users]);
            setForm({ name: "", email: "", password: "" });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-3xl font-bold mb-6">Users</h1>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add User
                </button>
            </form>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-2 py-1">ID</th>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-2 py-1">{user.id}</td>
                                <td className="border px-2 py-1">{user.name}</td>
                                <td className="border px-2 py-1">{user.email}</td>
                                <td className="border px-2 py-1">{user.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
