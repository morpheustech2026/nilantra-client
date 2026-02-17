import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiSearch, FiUser, FiShield, FiMail } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const fetchUsers = async () => {
    try {
      if (!userInfo?.token) return;
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("http://localhost:3000/api/user", config);
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Permanently remove this user?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:3000/api/user/${id}`, config);
        setUsers(users.filter((u) => u._id !== id));
        toast.success("User successfully removed");
      } catch (error) {
        toast.error("Deletion failed");
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white font-sans text-left">
      <Toaster position="top-right" />

     

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-serif font-bold italic tracking-tight text-[#001f3f]">
            User Management
          </h2>
          <p className="text-[#c7a17a] text-[10px] md:text-sm mt-1 uppercase tracking-widest font-bold">
            Admin Control Panel
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c7a17a]" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-[#001f3f] font-medium" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* ENHANCED NAVY BLUE BOX */}
      <div className="bg-[#001f3f] rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,31,63,0.5)] overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/30 border-b border-white/10">
                <th className="px-10 py-8 text-[11px] uppercase font-black tracking-[0.25em] text-[#d4af37]">Registered User</th>
                <th className="px-10 py-8 text-[11px] uppercase font-black tracking-[0.25em] text-[#d4af37]">Contact Info</th>
                <th className="px-10 py-8 text-[11px] uppercase font-black tracking-[0.25em] text-[#d4af37]">Account Role</th>
                <th className="px-10 py-8 text-[11px] uppercase font-black tracking-[0.25em] text-center text-[#d4af37]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-24 text-white font-serif text-lg animate-pulse">
                    Connecting to secure database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-24 text-white font-serif text-lg">
                    No matching user records found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-white/[0.05] transition-all duration-300 group">
                    {/* User Info Column */}
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#d4af37] border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                          <FiUser size={22}/>
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg tracking-wide">{user.name}</p>
                          <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest mt-0.5 font-bold">UID: {user._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-2 text-white/80 font-semibold text-sm">
                        <FiMail className="text-[#d4af37] shrink-0" size={16}/>
                        {user.email}
                      </div>
                    </td>

                    {/* Role Column */}
                    <td className="px-10 py-7">
                      <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 shadow-lg inline-flex items-center gap-2 ${
                        user.role === 'admin' 
                        ? 'bg-[#d4af37] text-[#001f3f] border-[#d4af37]' 
                        : 'bg-white/10 text-white border-white/20'
                      }`}>
                        {user.role === 'admin' && <FiShield size={12}/>}
                        {user.role}
                      </span>
                    </td>

                    {/* Action Column */}
                    <td className="px-10 py-7 text-center">
                      {user.role !== 'admin' ? (
                        <button 
                          onClick={() => deleteHandler(user._id)} 
                          className="p-3.5 text-white/40 hover:text-red-400 hover:bg-red-400/20 rounded-2xl transition-all border border-transparent hover:border-red-400/30 shadow-md"
                          title="Remove User"
                        >
                          <FiTrash2 size={20}/>
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Master</span>
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