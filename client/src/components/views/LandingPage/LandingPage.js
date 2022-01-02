import React, { useEffect, useState } from "react";
import axios from "axios";
function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/product").then((_res) => {
      console.log(_res);
      if (_res.data.success) {
        setProducts(_res.data.productList);
      } else {
        alert("상품 정보 조회에 실패");
      }
    });
  }, []);

  return (
    <div className="bg-white">
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
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
