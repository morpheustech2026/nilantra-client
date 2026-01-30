import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import Loader from "../components/Loader"; // ✅ NEW LOADER IMPORT

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

  const filteredProducts = products.filter(
    (p) => p.room === category && p.type === type
  );

  /* ================= LOADER UI ================= */
  if (loading) {
    return <Loader />; // ✅ NEW LOADER
  }

  return (
    <section className="min-h-screen bg-[#f5f3ef] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-heading font-semibold mb-10 capitalize text-ink">
          {type.replace("-", " ")}
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product-detailes/${product.id}`)
              }
              className="
                bg-white
                rounded-xl
                shadow-md
                cursor-pointer
                hover:shadow-xl
                transition
              "
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-[260px] w-full object-cover rounded-t-xl"
              />

              <div className="p-6">
                <h3 className="text-lg font-medium text-ink">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-ink/70">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductGroup;
