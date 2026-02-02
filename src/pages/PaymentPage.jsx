import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import paymentbg from "../assets/paymentbg.jpeg";

import { FaCreditCard, FaUniversity, FaWallet } from "react-icons/fa";
import { MdQrCodeScanner, MdLocalAtm } from "react-icons/md";
import { GiSwipeCard } from "react-icons/gi";

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

  const handleAddAddress = () => {
    if (
      !newAddress.type ||
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.address
    ) {
      alert("Please fill all fields");
      return;
    }

    const updated = [...addresses, newAddress];
    setAddresses(updated);
    setSelectedAddress(updated.length - 1);
    setNewAddress({
      type: "",
      name: "",
      phone: "",
      address: "",
    });
    setShowAddAddress(false);
  };

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
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    },
    {
      id: 2,
      name: "Modern Dining Chair",
      category: "Dining",
      material: "Oak Wood",
      price: 8999,
      qty: 2,
      image:
        "https://www.nismaayadecor.in/cdn/shop/files/edric-solid-mango-wood-dining-chair_1.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const gstAmount = Math.round((subtotal * 18) / 100);
  const deliveryCharge = subtotal >= 50000 ? 0 : 999;
  const total = subtotal + gstAmount + deliveryCharge;

  return (
    <div
      className="min-h-screen pt-40 pb-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${paymentbg})` }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Shipping Address */}
        <section className="bg-[#0b1f3a] rounded-2xl p-6 shadow-xl text-white h-full">
          <h2 className="text-xl font-semibold mb-6">
            Shipping Address
          </h2>

          <div className="space-y-4">
            {addresses.map((addr, i) => (
              <div
                key={i}
                onClick={() => setSelectedAddress(i)}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddress === i
                    ? "border-blue-400 bg-[#102c55]"
                    : "border-gray-600"
                }`}
              >
                <p className="font-semibold">{addr.type}</p>
                <p className="text-sm">{addr.name}</p>
                <p className="text-sm">{addr.phone}</p>
                <p className="text-sm text-gray-300">
                  {addr.address}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="mt-6 w-full border border-dashed border-gray-500 rounded-xl py-3 font-semibold hover:bg-[#102c55] transition-colors"
          >
            + Add New Address
          </button>

          {showAddAddress && (
            <div className="mt-5 border border-gray-600 rounded-xl p-4 space-y-3 bg-[#08182f]">
              <input
                className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-[#08182f] text-white placeholder:text-gray-400"
                placeholder="Type (Home / Office)"
                value={newAddress.type}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, type: e.target.value })
                }
              />

              <input
                className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-[#08182f] text-white placeholder:text-gray-400"
                placeholder="Name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />

              <input
                className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-[#08182f] text-white placeholder:text-gray-400"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />

              <textarea
                className="border border-gray-600 rounded-lg px-3 py-2 w-full bg-[#08182f] text-white placeholder:text-gray-400"
                placeholder="Full Address"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
              />

              <button
                onClick={handleAddAddress}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                Save Address
              </button>
            </div>
          )}
        </section>

        {/* Order Summary */}
        <section className="bg-[#0b1f3a] rounded-2xl p-6 shadow-xl text-white lg:row-span-2 h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-600 pb-4 mb-4"
              >
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-xl object-cover"
                  alt={item.name}
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-300">
                    {item.category} • {item.material}
                  </p>
                  <p className="text-sm">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-gray-600 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">GST (18%)</span>
              <span>₹{gstAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Delivery</span>
              <span className="text-green-400 font-semibold">
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-gray-600 pt-3 mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98]">
            Place Order
          </button>
        </section>

        {/* Payment Method */}
        <section className="bg-[#0b1f3a] rounded-2xl p-6 shadow-xl text-white">
          <h2 className="text-xl font-semibold mb-6">
            Payment Method
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPayment(method.id)}
                className={`border rounded-xl py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  payment === method.id
                    ? "border-blue-400 bg-[#102c55]"
                    : "border-gray-600"
                }`}
              >
                {method.id === "card" && (
                  <FaCreditCard size={18} color="#60a5fa" />
                )}
                {method.id === "upi" && (
                  <MdQrCodeScanner size={18} color="#c084fc" />
                )}
                {method.id === "netbanking" && (
                  <FaUniversity size={18} color="#34d399" />
                )}
                {method.id === "wallet" && (
                  <FaWallet size={18} color="#fbbf24" />
                )}
                {method.id === "cod" && (
                  <MdLocalAtm size={18} color="#f87171" />
                )}

                <span>{method.label}</span>
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
                    className={`rounded-xl py-3 text-sm font-semibold border-2 border-dotted transition-all
                      flex items-center justify-center gap-2 ${
                        cardType === t
                          ? "border-blue-400 bg-[#102c55]"
                          : "border-gray-600"
                      }`}
                  >
                    {t === "Debit Card" && (
                      <GiSwipeCard size={18} color="#60a5fa" />
                    )}
                    {t === "Credit Card" && (
                      <FaCreditCard size={18} color="#34d399" />
                    )}
                    <span>{t}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <input
                  className="border border-gray-600 rounded-xl px-4 py-3 w-full bg-[#08182f] text-white placeholder:text-gray-400 focus:outline-blue-400"
                  placeholder="Card Number"
                />
                <div className="flex gap-3">
                  <input
                    className="border border-gray-600 rounded-xl px-4 py-3 w-full bg-[#08182f] text-white placeholder:text-gray-400 focus:outline-blue-400"
                    placeholder="MM / YY"
                  />
                  <input
                    className="border border-gray-600 rounded-xl px-4 py-3 w-full bg-[#08182f] text-white placeholder:text-gray-400 focus:outline-blue-400"
                    placeholder="CVV"
                  />
                </div>
                <input
                  className="border border-gray-600 rounded-xl px-4 py-3 w-full bg-[#08182f] text-white placeholder:text-gray-400 focus:outline-blue-400"
                  placeholder="Card Holder Name"
                />
              </div>
            </div>
          )}

          {payment === "netbanking" && (
            <select
              className="border border-gray-600 rounded-xl px-4 py-3 w-full bg-[#08182f] text-white focus:outline-blue-400"
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option className="bg-[#08182f]">Select Bank</option>
              {banks.map((bank) => (
                <option key={bank} className="bg-[#08182f]">
                  {bank}
                </option>
              ))}
            </select>
          )}
        </section>
      </div>
    </div>
  );
}
