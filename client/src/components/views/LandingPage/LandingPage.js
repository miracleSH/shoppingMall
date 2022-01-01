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
    <div className="relative container mx-auto my-24">
      <div className="justify-center flex flex-wrap columns-4 mx-auto">
        {products.map((product, index) => {
          return (
            <div key={index} className="flex flex-col mx-auto mb-12 w-72 h-76 border border-2 ">
              <div className="flex flex-row overflow-x-scroll">
                {product.images.map((image, index) => {
                  return <img key={index} className="w-full min-w-full max-h-60" alt="product" src={`http://localhost:5000/uploads/${image}`} />;
                })}
              </div>

              <div className="text-center">{product.title}</div>
              <div className="text-center">{product.country}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LandingPage;
