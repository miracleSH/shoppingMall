import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);

  const loadProducts = (body) => {
    axios.post("/api/product/products", body).then((_res) => {
      if (_res.data.success) {
        if (body.isLoadMore) {
          setProducts([...products, ..._res.data.productList]);
        } else {
          setProducts(_res.data.productList);
        }
        setPostSize(_res.data.postSize);
      } else {
        alert("상품 정보 조회에 실패");
      }
    });
  };

  useEffect(() => {
    let body = {
      skip: skip,
      limit: limit,
    };
    loadProducts(body);
  }, []);

  const loadMoreHandler = () => {
    let skip = +limit;

    let body = {
      limit: limit,
      skip: skip,
      isLoadMore: true,
    };
    setSkip(skip);
    loadProducts(body);
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <div key={index} className="group relative">
              {product.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={product.title}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                );
              })}

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={"#"}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price ? product.price : null}</p>
              </div>
            </div>
          ))}
        </div>
        {postSize >= limit && (
          <div className="grid my-12 justify-items-center">
            <button onClick={loadMoreHandler} className="px-6 text-white bg-indigo-600 border-solid border-2 border-indigo-600 rounded-lg">
              더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
