import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import Product360Viewer from "../components/Product360Viewer";

function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const product = products.find((p) => p.id === id);

  /* ================= LOADER ON ROUTE CHANGE ================= */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth delay

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0b161b] flex items-center justify-center z-[9999]">
        <div className="loader" />
      </div>
    );
  }

  if (!product) {
    return <div className="p-20">Product not found</div>;
  }

  return (
    <section className="bg-[#0b161b] min-h-screen py-32 text-ivory">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-xl shadow-xl mb-6"
          />

          {product.images360?.length > 0 && (
            <Product360Viewer images={product.images360} />
          )}
        </div>

        <div>
          <h1 className="font-heading text-4xl mb-4">
            {product.name}
          </h1>

          <p className="text-brand text-xl mb-6">
            {product.price}
          </p>

          <p className="text-ivory/70 mb-8">
            {product.description}
          </p>

          <h3 className="font-heading text-xl mb-4">
            Materials Used
          </h3>

          <ul className="space-y-2 text-ivory/70">
            {product.materials.map((mat, i) => (
              <li key={i}>• {mat}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

export default ProductDetails;
