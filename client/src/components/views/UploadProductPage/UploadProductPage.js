import React, { useState } from "react";
import FileUpload from "../../utils/FileUpload";
const UploadProductPage = () => {
  /**
   * * state 부분
   */
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

  const countriesList = ["Korea", "Japan", "China", "America", "Russia", "Europe", "etc"];
  const [country, setCountry] = useState("Korea");

  const onChangeHandler = {
    initProductName: (event) => {
      setProductName(event.target.value);
    },
    initDescription: (event) => {
      setDescription(event.target.value);
    },
    initPrice: (event) => {
      setPrice(event.target.value);
    },
    initCountry: (event) => {
      setCountry(event.target.value);
    },
    initImages: (event) => {
      setImages();
    },
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative my-10 container mx-auto">
      <div className="w-6/12 mx-auto">
        <h1>여행 상품 업로드</h1>
        <form className="flex flex-col">
          <FileUpload />
          <label className="">이름</label>
          <input
            className="border border-2"
            type={"text"}
            value={productName}
            onChange={onChangeHandler.initProductName}
            placeholder="상품 이름을 입력하세요."
          />
          <label>설명</label>
          <textarea className="border border-2" value={description} onChange={onChangeHandler.initDescription}></textarea>
          <label>가격</label>
          <input className="border border-2" type={"number"} value={price} onChange={onChangeHandler.initPrice} />
          <label>국가</label>
          <select className="border border-2" value={country} onChange={onChangeHandler.initCountry}>
            {countriesList.map((country, index) => {
              return (
                <option value={country} key={index}>
                  {country}
                </option>
              );
            })}
          </select>
          <button className="float-left w-20 border border-2" type="submit" onClick={onSubmitHandler}>
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;
