import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const RecentUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://zidio-task-management-backend.onrender.com/admin/users") // API URL
      .then((res) => res.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUsers(sortedUsers);
      })
      .catch((err) => console.error(err));
  }, []);
  const formatDate = (utcDate) => {
    return new Date(utcDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};
  return (
    <div className="bg-white p-4 shadow rounded-lg col-span-2">
      <h3 className="text-xl font-semibold mb-4">Recent Users</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border border-gray-200">Name</th>
              <th className="p-2 text-left border border-gray-200">Email</th>
              <th className="p-2 text-left border border-gray-200">Date</th>
              <th className="p-2 text-left border border-gray-200">login time</th>
              <th className="p-2 text-left border border-gray-200">logout time</th>
              <th className="p-2 text-left border border-gray-200">JWT token name</th>
              <th className="p-2 text-left border border-gray-200">user name</th>
              <th className="p-2 text-left border border-gray-200">role</th>
              <th className="p-2 text-left border border-gray-200">ip address</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-200">{user.fullName}</td>
                <td className="p-2 border border-gray-200">{user.email}</td>
                <td className="p-2 border border-gray-200">{formatDate(user.createdAt)}</td>
                <td className="p-2 border border-gray-200">{formatDate(user.loginTime)}</td>
                <td className="p-2 border border-gray-200">{formatDate(user.logoutTime)}</td>
                <td className="p-2 border border-gray-200">{user.jwtTokenName}</td>
                <td className="p-2 border border-gray-200">{user.userName}</td>
                <td className="p-2 border border-gray-200">{user.role}</td>
                <td className="p-2 border border-gray-200">{user.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
