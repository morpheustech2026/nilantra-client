const roomCategories = {
  "living-room": [
    { slug: "sofa", title: "Sofa", image: "/product/white-sofa.png" },
    { slug: "diwan-bed", title: "Diwan Bed", image: "/product/diwan-bed.png" },
    { slug: "chair", title: "Chair", image: "/product/chair.png" },
    // DB-ൽ Coffee Table എന്നാണെങ്കിൽ സ്ലഗ് ഇങ്ങനെ വേണം
    { slug: "coffee-table", title: "Table", image: "/product/wooden-table.png" }, 
    { slug: "media-unit", title: "Media Unit", image: "/product/tv-stand.png" },
    { slug: "storage", title: "Storage", image: "/product/shelf.png" },
    { slug: "recliner", title: "Recliner", image: "/product/recliner.jpg" },
    { slug: "indoor-swing", title: "Indoor Swing", image: "/product/indoor-swing.webp" },
  ],

  "dining-room": [
    { slug: "dining-table", title: "Dining Table", image: "/product/din.jpg" },
    { slug: "dining-chair", title: "Dining Chair", image: "/product/din2.webp" },
    { slug: "crockery-unit", title: "Crockery Unit", image: "/product/crok.webp" },
    { slug: "benching-seat", title: "Benching Seat", image: "/product/benching-seat.jpg" },
    { slug: "partition-shelf", title: "Partition Shelf", image: "/product/partition-shelf.jpeg" },
    { slug: "bar-cabinet", title: "Bar Cabinet", image: "/product/bar-cabinet.webp" },
    { slug: "sideboard", title: "Sideboard", image: "/product/sideboard.webp" },
    { slug: "chandelier-light", title: "Chandelier Light", image: "/product/chandelier-light.jpg" },
  ],

  // ബാക്കിയുള്ളവയും ഇതേപോലെ DB-ൽ നിങ്ങൾ നൽകുന്ന subCategory പേരുമായി മാച്ച് ആക്കുക
  bedroom: [
    { slug: "bed", title: "Bed", image: "/kingsize-bed.webp" },
    { slug: "wardrobe", title: "Wardrobe", image: "/ward.jpg" },
    { slug: "side-table", title: "Side Table", image: "/side.jpg" },
    { slug: "dresser", title: "Dresser", image: "/dress.jpg" },
  ],
  // ... മറ്റ് റൂമുകളും ഇതേപോലെ ചെക്ക് ചെയ്യുക
};

export default roomCategories;