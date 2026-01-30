// src/data/products.js

export const products = [
  /* ================= LIVING ROOM ================= */
  {
    id: "lr-sofa-01",
    room: "living-room",
    type: "sofa",
    name: "Luxury Fabric Sofa",
    price: "₹1,20,000",
    images: ["/sofa1.webp"],
  },
  {
    id: "lr-sofa-02",
    room: "living-room",
    type: "sofa",
    name: "Modern L Shape Sofa",
    price: "₹1,85,000",
    images: ["/L-shape.png"],
  },
  {
    id: "lr-diwan-01",
    room: "living-room",
    type: "diwan-bed",
    name: "Classic Diwan Bed",
    price: "₹95,000",
    images: ["/diwan.png"],
  },
  {
    id: "lr-chair-01",
    room: "living-room",
    type: "chair",
    name: "Accent Arm Chair",
    price: "₹45,000",
    images: ["/arm-chair.png"],
  },
  {
    id: "lr-table-01",
    room: "living-room",
    type: "table",
    name: "Coffee Table",
    price: "₹38,000",
    images: ["/coffee.jpg"],
  },
  {
    id: "lr-media-01",
    room: "living-room",
    type: "media",
    name: "TV Unit",
    price: "₹85,000",
    images: ["/tv.jpg"],
  },
  {
    id: "lr-storage-01",
    room: "living-room",
    type: "storage",
    name: "Storage Unit",
    price: "₹1,05,000",
    images: ["/storage.jpg"],
  },

  /* ================= DINING ROOM ================= */
  {
    id: "dr-table-01",
    room: "dining-room",
    type: "dining-table",
    name: "6 Seater Dining Table",
    price: "₹1,20,000",
    images: ["/dining.jpg"],
  },
  {
    id: "dr-chair-01",
    room: "dining-room",
    type: "dining-chair",
    name: "Dining Chair",
    price: "₹28,000",
    images: ["/dine2.webp"],
  },
  {
    id: "dr-crockery-01",
    room: "dining-room",
    type: "crockery-unit",
    name: "Luxury Crockery Unit",
    price: "₹75,000",
    images: ["/src/data/product/crok.webp"],
  },

  /* ================= BEDROOM ================= */
  {
    id: "br-bed-01",
    room: "bedroom",
    type: "bed",
    name: "King Size Bed",
    price: "₹1,80,000",
    images: ["/public/king.jpg"],
  },
  {
    id: "br-wardrobe-01",
    room: "bedroom",
    type: "wardrobe",
    name: "Wardrobe",
    price: "₹2,40,000",
    images: ["/public/ward1.avif"],
  },
  {
    id: "br-sidetable-01",
    room: "bedroom",
    type: "sidetable",
    name: "sidetable",
    price: "₹40,000",
    images: ["/public/ward1.avif"],
  },

  /* 🔹 ADDED: Bedroom Dresser */
  {
    id: "br-dresser-01",
    room: "bedroom",
    type: "dresser",
    name: "Bedroom Dresser",
    price: "₹65,000",
    images: ["/public/dresser.jpg"],
  },

  /* ================= KITCHEN ================= */
  {
    id: "kt-cabinet-01",
    room: "kitchen",
    type: "cabinet",
    name: "Modular Kitchen Cabinet",
    price: "₹3,20,000",
    images: ["/products/kitchen/1.jpg"],
  },

  /* 🔹 ADDED: Kitchen Island Counter */
  {
    id: "kt-island-01",
    room: "kitchen",
    type: "island-counter",
    name: "Kitchen Island Counter",
    price: "₹1,50,000",
    images: ["/public/island.jpg"],
  },

  /* 🔹 ADDED: Kitchen Storage Unit */
  {
    id: "kt-storage-01",
    room: "kitchen",
    type: "storage-unit",
    name: "Kitchen Storage Unit",
    price: "₹95,000",
    images: ["/public/kitchen-storage.jpg"],
  },

  /* ================= GARDEN ================= */
  {
    id: "gd-chair-01",
    room: "garden",
    type: "outdoor-chair",
    name: "Outdoor Chair",
    price: "₹42,000",
    images: ["/products/garden/chair/1.jpg"],
  },

  /* 🔹 ADDED: Outdoor Swing */
  {
    id: "gd-swing-01",
    room: "garden",
    type: "outdoor-swing",
    name: "Outdoor Swing",
    price: "₹88,000",
    images: ["/public/swing.jpg"],
  },

  /* 🔹 ADDED: Patio Set */
  {
    id: "gd-patio-01",
    room: "garden",
    type: "patio-set",
    name: "Garden Patio Set",
    price: "₹1,35,000",
    images: ["/public/patio.jpg"],
  },

  /* ================= OFFICE ================= */
  {
    id: "of-chair-01",
    room: "office",
    type: "office-chair",
    name: "Office Chair",
    price: "₹55,000",
    images: ["/products/office/chair/1.jpg"],
  },

  /* 🔹 ADDED: Work Desk */
  {
    id: "of-desk-01",
    room: "office",
    type: "workdesk",
    name: "Office Work Desk",
    price: "₹95,000",
    images: ["/public/workdesk.jpg"],
  },

  /* 🔹 ADDED: Bookshelf */
  {
    id: "of-bookshelf-01",
    room: "office",
    type: "bookshelf",
    name: "Office Bookshelf",
    price: "₹78,000",
    images: ["/public/bookshelf.jpg"],
  },

  /* ================= THEATRE ROOM ================= */
  {
    id: "tr-sofa-01",
    room: "theatre-room",
    type: "recliner",
    name: "Recliner Sofa",
    price: "₹2,60,000",
    images: ["/products/theatre/sofa/1.jpg"],
  },

  /* 🔹 ADDED: Theatre Sofa */
  {
    id: "tr-theatre-sofa-01",
    room: "theatre-room",
    type: "theatre-sofa",
    name: "Luxury Theatre Sofa",
    price: "₹3,20,000",
    images: ["/public/theatre-sofa.jpg"],
  },

  /* 🔹 ADDED: Acoustic Panels */
  {
    id: "tr-acoustic-01",
    room: "theatre-room",
    type: "acoustic-panel",
    name: "Acoustic Wall Panels",
    price: "₹1,10,000",
    images: ["/public/acoustic.jpg"],
  },

  /* 🔹 ADDED: Media Console */
  {
    id: "tr-media-01",
    room: "theatre-room",
    type: "media-console",
    name: "Theatre Media Console",
    price: "₹1,45,000",
    images: ["/public/media-console.jpg"],
  },
];
