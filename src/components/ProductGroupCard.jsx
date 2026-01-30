import { useNavigate } from "react-router-dom";

function ProductGroupCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        cursor-pointer
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-heading text-sm">
          {product.name}
        </h3>

        {product.price && (
          <p className="text-brand text-sm mt-1">
            {product.price}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductGroupCard;
