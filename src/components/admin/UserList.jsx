import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiTrash2, FiMail, FiShield, FiUser, FiSearch } from "react-icons/fi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const fetchUsers = async () => {
    try {
      if (!userInfo || !userInfo.token) {
        console.error("Token missing! Please login again.");
        setLoading(false);
        return;
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${userInfo.token}` 
        },
      };

     
      const { data } = await axios.get("http://localhost:3000/api/user", config);
      
      console.log("Users fetched:", data); 
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error.response?.data?.error || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("you want to remove the user")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
       
        await axios.delete(`http://localhost:3000/api/users/${id}`, config);
        setUsers(users.filter((user) => user._id !== id));
        alert("User removed!");
      } catch (error) {
        alert(error.response?.data?.error || "Delete failed");
      }
    }
  };

  
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic tracking-tight text-[#001f3f]">
            User Management
          </h2>
          <p className="text-[#c7a17a] text-[10px] md:text-xs mt-1 uppercase tracking-[0.2em] font-bold">
            Admin Control Panel
          </p>
        </div>

        
        <div className="relative w-full md:w-80 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c7a17a] transition-colors" />
          <input 
            type="text" 
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 bg-[#001f3f]/5 border border-[#001f3f]/10 rounded-full text-sm outline-none focus:border-[#c7a17a] transition-all text-[#001f3f]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

     
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#001f3f] text-white">
                <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-[0.2em]">Registered User</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-[0.2em]">Contact</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-[0.2em]">Role</th>
                <th className="px-8 py-5 text-[10px] uppercase font-bold tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-gray-400 italic">
                    Fetching records from database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-gray-400 font-medium font-serif italic">
                    No users found in records.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-[#001f3f]/5 rounded-xl flex items-center justify-center text-[#001f3f]">
                          <FiUser size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-[#001f3f] text-sm">{user.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">ID: {user._id?.substring(user._id.length - 6).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <FiMail className="text-[#c7a17a]" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                    
                      {user.role === 'admin' ? (
                        <span className="bg-green-50 text-green-600 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-green-100 flex items-center gap-1 w-fit tracking-tighter">
                          <FiShield size={10}/> Admin Access
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-blue-100 w-fit tracking-tighter">
                          Verified User
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5 text-center">
                   
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;