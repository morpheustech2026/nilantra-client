import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Payment() {
  const [payment, setPayment] = useState("card");
  const [cardType, setCardType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      type: "Home",
      name: "Adarsh KV",
      phone: "+91 9876543210",
      address: "123, MG Road, Kochi, Kerala - 682001",
    },
    {
      type: "Office",
      name: "Adarsh KV",
      phone: "+91 9876543210",
      address: "Infopark, Kakkanad, Kochi - 682042",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    type: "",
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  const paymentMethods = [
    { id: "card", label: "Card" },
    { id: "upi", label: "UPI" },
    { id: "netbanking", label: "Net Banking" },
    { id: "wallet", label: "Wallet" },
    { id: "cod", label: "COD" },
  ];

  const banks = ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank"];

  const cartItems = [
    {
      id: 1,
      name: "Luxury Wooden Sofa",
      category: "Living Room",
      material: "Teak Wood",
      price: 45999,
      qty: 1,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    },
    {
      id: 2,
      name: "Modern Dining Chair",
      category: "Dining",
      material: "Oak Wood",
      price: 8999,
      qty: 2,
      image: "https://www.nismaayadecor.in/cdn/shop/files/edric-solid-mango-wood-dining-chair_1.jpg",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gstAmount = Math.round((subtotal * 18) / 100);
  const deliveryCharge = subtotal >= 50000 ? 0 : 999;
  const total = subtotal + gstAmount + deliveryCharge;

  return (
    <div className="min-h-screen pt-40 bg-gradient-to-br from-[#0f172a] via-[#0b2a4a] to-[#020617] pt-24 pb-16">
      {/* Container: Changed to Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* 1. SHIPPING ADDRESS (Left - Row 1) */}
        <section className="bg-white rounded-2xl p-6 shadow-xl text-black h-full">
          <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
          <div className="space-y-4">
            {addresses.map((addr, i) => (
              <div
                key={i}
                onClick={() => setSelectedAddress(i)}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddress === i ? "border-blue-600 bg-blue-50" : "border-gray-300"
                }`}
              >
                <p className="font-semibold">{addr.type}</p>
                <p className="text-sm">{addr.name}</p>
                <p className="text-sm">{addr.phone}</p>
                <p className="text-sm">{addr.address}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="mt-6 w-full border border-dashed border-gray-400 rounded-xl py-3 font-semibold hover:bg-gray-50 transition-colors"
          >
            + Add New Address
          </button>
        </section>

        {/* 2. ORDER SUMMARY (Right - Spans 2 Rows) */}
        <section className="bg-white rounded-2xl p-6 shadow-xl text-black lg:row-span-2 h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4 mb-4">
                <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.category} • {item.material}</p>
                  <p className="text-sm">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t pt-4 mt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gstAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-3 mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98]">
            Place Order
          </button>
        </section>

        {/* 3. PAYMENT METHOD (Left - Row 2) */}
        <section className="bg-white rounded-2xl p-6 shadow-xl text-black">
          <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPayment(method.id)}
                className={`border rounded-xl py-3 text-sm font-semibold transition-all ${
                  payment === method.id ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "border-gray-300"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          {payment === "card" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-4 mb-5">
                {["Debit Card", "Credit Card"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setCardType(t)}
                    className={`rounded-xl py-3 text-sm font-semibold border-2 border-dotted transition-all ${
                      cardType === t ? "border-blue-600 bg-blue-50" : "border-gray-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <input className="border rounded-xl px-4 py-3 w-full focus:outline-blue-500" placeholder="Card Number" />
                <div className="flex gap-3">
                  <input className="border rounded-xl px-4 py-3 w-full focus:outline-blue-500" placeholder="MM / YY" />
                  <input className="border rounded-xl px-4 py-3 w-full focus:outline-blue-500" placeholder="CVV" />
                </div>
                <input className="border rounded-xl px-4 py-3 w-full focus:outline-blue-500" placeholder="Card Holder Name" />
              </div>
            </div>
          )}

          {payment === "netbanking" && (
            <select
              className="border rounded-xl px-4 py-3 w-full focus:outline-blue-500"
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option>Select Bank</option>
              {banks.map((bank) => <option key={bank}>{bank}</option>)}
            </select>
          )}
        </section>

      </div>
    </div>
  );
}