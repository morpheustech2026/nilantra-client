function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-luxe transition duration-500 overflow-hidden">

      {/* IMAGE */}
       <img
        src={product.images[0]}
        alt={product.name}
        className="h-48 w-full object-cover rounded-t-2xl"
      />

      {/* CONTENT */}
      <div className="p-4">
        <h4 className="text-ink font-medium">
          {product.name}
        </h4>

        <p className="text-ink/70 text-sm mt-1">
          ₹{product.price}
        </p>
      </div>

    </div>
  );
}

export default ProductCard;
