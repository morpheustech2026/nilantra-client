import { useState, useMemo } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiSearch } from "react-icons/fi";

/* ---------------- OPTIONS ---------------- */
const CATEGORY_MAP = {
  Furniture: ["Chair", "Table", "Sofa"],
  Flooring: ["Wooden", "Epoxy"],
  Decor: ["Vase", "Lamp"],
  Livingroom: ["Bed"],
};

const STATUS_OPTIONS = [
  "New",
  "Pending",
  "Completed",
  "Contacted",
  "Active",
  "Inactive",
];

/* ---------------- PREMIUM TAG MULTI SELECT ---------------- */
const MultiSelect = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2 mt-3">
    {options.map((opt) => {
      const active = value.includes(opt);
      return (
        <button
          key={opt}
          type="button"
          onClick={() =>
            onChange(
              active ? value.filter((v) => v !== opt) : [...value, opt]
            )
          }
          className={`px-3 py-1 rounded-full text-xs border transition flex items-center gap-2
            ${
              active
                ? "bg-[#c7a17a] text-black border-[#c7a17a]"
                : "border-white/15 text-slate-400 hover:border-[#c7a17a]"
            }`}
        >
          {active && <FiCheck size={12} />}
          {opt}
        </button>
      );
    })}
  </div>
);

const glass =
  "bg-gradient-to-br from-[#121826] to-[#0b0e14] border border-white/5";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("media");

  /* ---------------- MEDIA ---------------- */
  const [mediaList, setMediaList] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState(""); // ✅ FIXED

  /* ---------------- MULTI SELECT ---------------- */
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) =>
    setSelectedIds((p) =>
      p.includes(id) ? p.filter((i) => i !== id) : [...p, id]
    );

  const toggleSelectAll = (items) =>
    selectedIds.length === items.length
      ? setSelectedIds([])
      : setSelectedIds(items.map((i) => i.id));

  /* ---------------- CRUD ---------------- */
  const [editType, setEditType] = useState(null);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  /* ---------------- DATA ---------------- */
  const [vendors, setVendors] = useState([
    { id: 1, name: "Royal Furnishings", category: ["Furniture"], status: ["Active"] },
    { id: 2, name: "Elite Decor", category: ["Decor"], status: ["Inactive"] },
  ]);

  const [orders, setOrders] = useState([
    { id: "#ORD1001", customer: "Amit Sharma", status: ["Pending"] },
    { id: "#ORD1002", customer: "Priya Nair", status: ["Completed"] },
  ]);

  const [enquiries, setEnquiries] = useState([
    { id: 1, name: "Rahul Verma", status: ["New"] },
    { id: 2, name: "Sneha Iyer", status: ["Contacted"] },
  ]);

  /* ---------------- FILTERED LIST ---------------- */
  const rawList =
    activeSection === "vendors"
      ? vendors
      : activeSection === "orders"
      ? orders
      : enquiries;

  const currentList = useMemo(() => {
    return rawList.filter((i) =>
      (i.name || i.customer || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [rawList, search]);

  /* ---------------- MEDIA UPLOAD ---------------- */
  const handleUpload = () => {
    if (!file || !title || !category || !subcategory) return;

    setMediaList([
      { id: Date.now(), title, preview: URL.createObjectURL(file) },
      ...mediaList,
    ]);

    setFile(null);
    setTitle("");
    setCategory("");
    setSubcategory("");
  };

  /* ---------------- SAVE ---------------- */
  const saveEdit = () => {
    if (editType === "vendor")
      setVendors(vendors.map((v) => (v.id === editData.id ? editData : v)));
    if (editType === "order")
      setOrders(orders.map((o) => (o.id === editData.id ? editData : o)));
    if (editType === "enquiry")
      setEnquiries(enquiries.map((e) => (e.id === editData.id ? editData : e)));
    setEditData(null);
  };

  /* ---------------- BULK STATUS ---------------- */
  const bulkStatusUpdate = (status) => {
    const update = (list) =>
      list.map((i) =>
        selectedIds.includes(i.id) ? { ...i, status } : i
      );

    if (activeSection === "vendors") setVendors(update(vendors));
    if (activeSection === "orders") setOrders(update(orders));
    if (activeSection === "enquiries") setEnquiries(update(enquiries));

    setSelectedIds([]);
  };

  /* ---------------- BULK DELETE ---------------- */
  const bulkDelete = () => {
    if (activeSection === "vendors")
      setVendors(vendors.filter((v) => !selectedIds.includes(v.id)));
    if (activeSection === "orders")
      setOrders(orders.filter((o) => !selectedIds.includes(o.id)));
    if (activeSection === "enquiries")
      setEnquiries(enquiries.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen flex bg-[#0b0e14] text-slate-200">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f141c] border-r border-white/5 p-8">
        <h1 className="text-2xl font-serif mb-10">
          Nilantra
          <span className="block text-xs text-slate-400 tracking-widest">
            ADMIN
          </span>
        </h1>

        {["media", "vendors", "orders", "enquiries"].map((s) => (
          <div
            key={s}
            onClick={() => {
              setActiveSection(s);
              setSelectedIds([]);
              setSearch("");
            }}
            className={`mb-4 cursor-pointer ${
              activeSection === s
                ? "text-[#c7a17a]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {s.toUpperCase()}
          </div>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10 space-y-8">
        {/* ================= MEDIA ================= */}
        {activeSection === "media" && (
          <>
            <div className={`${glass} rounded-2xl p-6`}>
              <h2 className="text-xl mb-1">Media Library</h2>
              <p className="text-xs text-slate-400">
                {mediaList.length} items uploaded
              </p>
            </div>

            <div className={`${glass} rounded-2xl p-8`}>
              <h3 className="mb-6">Upload Media</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="bg-[#0b0e14] border border-white/10 rounded px-4 py-3"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <select
                  className="bg-[#0b0e14] border border-white/10 rounded px-4 py-3"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                  }}
                >
                  <option value="">Select Category</option>
                  {Object.keys(CATEGORY_MAP).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                <select
                  className="bg-[#0b0e14] border border-white/10 rounded px-4 py-3"
                  value={subcategory}
                  disabled={!category}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {category &&
                    CATEGORY_MAP[category].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                </select>

                <label className="border border-dashed border-white/15 rounded px-4 py-3 text-sm cursor-pointer">
                  {file ? file.name : "Click to upload"}
                  <input hidden type="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>

                <button
                  onClick={handleUpload}
                  className="bg-[#c7a17a] text-black py-3 rounded col-span-2"
                >
                  Upload Media
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {mediaList.map((m) => (
                <div key={m.id} className="relative group bg-[#121826] rounded-xl overflow-hidden">
                  <img src={m.preview} className="h-40 w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <FiTrash2
                      className="text-red-400 cursor-pointer"
                      onClick={() => setConfirmDelete({ type: "media", id: m.id })}
                    />
                  </div>
                  <div className="p-3 text-sm truncate">{m.title}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= LIST PAGES ================= */}
        {activeSection !== "media" && (
          <>
            <div className="flex gap-3 items-center bg-[#121826] px-4 py-2 rounded-lg">
              <FiSearch />
              <input
                className="bg-transparent outline-none text-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="bg-[#121826] p-4 rounded-xl flex justify-between items-center">
                <MultiSelect
                  options={STATUS_OPTIONS}
                  value={[]}
                  onChange={(v) => bulkStatusUpdate(v)}
                />
                <FiTrash2
                  className="text-red-400 cursor-pointer"
                  onClick={bulkDelete}
                />
              </div>
            )}

            <div className="bg-[#121826] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <input
                  type="checkbox"
                  checked={
                    currentList.length > 0 &&
                    selectedIds.length === currentList.length
                  }
                  onChange={() => toggleSelectAll(currentList)}
                />
                <span className="text-sm text-slate-400">Select All</span>
              </div>

              {currentList.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-white/5 py-3">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                    <div>
                      <p>{item.name || item.customer}</p>
                      <div className="flex gap-2 mt-1">
                        {item.status.map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-full bg-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FiEdit2
                      className="text-[#c7a17a] cursor-pointer"
                      onClick={() => {
                        setEditType(activeSection.slice(0, -1));
                        setEditData(item);
                      }}
                    />
                    <FiTrash2 className="text-red-400 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}