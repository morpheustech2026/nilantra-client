import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import Loader from "../components/Loader";

function ProductGroup() {
  const { category, type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  /* ================= LOADER ON ROUTE CHANGE ================= */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [category, type]);

  // Filter products based on URL params
  const filteredProducts = products.filter(
    (p) => p.room === category && p.type === type
  );

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#f5f3ef] pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-heading font-semibold mb-10 capitalize text-gray-900">
          {type.replace("-", " ")}
        </h1>

        {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No products found in this category.</div>
        ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
                <div
                key={product.id}
                onClick={() =>
                    // ✅ FIXED SPELLING: 'details' instead of 'detailes'
                    navigate(`/product-details/${product.id}`)
                }
                className="
                    bg-white
                    rounded-xl
                    shadow-md
                    cursor-pointer
                    hover:shadow-xl
                    transition
                    group
                "
                >
                <div className="h-[260px] overflow-hidden rounded-t-xl">
                    <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-gray-600">
                    {product.price}
                    </p>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
}

export default ProductGroup;