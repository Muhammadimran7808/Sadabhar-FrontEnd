import toast from "react-hot-toast";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Search = () => {
  const [search] = useSearch(); //custum hook
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search result"}>
      <div className="container p-5">
        <div className="text-center">
          <h1>Search result</h1>

          <h6>
            {search?.result.length < 1
              ? "No Product Found"
              : `${search?.result.length} Products Found`}
          </h6>

          <div className="product-container">
            {search?.result?.map((product) => (
              <div
                key={product._id}
                className="w-full rounded overflow-hidden shadow-lg"
              >
                <div className="border overflow-hidden">
                  {" "}
                  <img
                    className="image-transition hover:scale-110 w-full md:h-80 h-60"
                    src={`https://sadabahar-backend.onrender.com/api/v1/products/product-picture/${product?._id}`}
                    loading="lazy"
                    alt={product.name}
                  />
                </div>
                <div className="px-3 py-4">
                  <div className="product-title-price flex flex-row justify-around mb-2">
                    <div className="font-bold md:text-xl text-base">
                      {product.name}
                    </div>
                    <div className="font-medium md:text-lg text-base">
                      ${product.price}
                    </div>
                  </div>
                  <p className="text-gray-700 text-base">
                    {product.description.substring(0, 35)}...
                  </p>
                </div>
                <div className="pb-2 flex content-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="md:px-3 md:py-2 px-1 py-1 md:text-sm text-xs md:font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:outline-none"
                  >
                    More Detail
                  </button>
                  <button
                    onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item added to cart");
                    }}
                    className="md:px-3 md:py-2 px-1 py-1 md:text-sm text-xs md:font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-2 focus:outline-none"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
