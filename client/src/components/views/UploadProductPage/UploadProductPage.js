import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../utils/FileUpload";
const UploadProductPage = (props) => {
  /**
   * * state 부분
   */
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);

  const countriesList = ["Korea", "Japan", "China", "America", "Russia", "Europe", "etc"];
  const [country, setCountry] = useState("Korea");

  const navigate = useNavigate();

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
    if (!productName || !description || !price || !images) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    console.log(props.user);
    const user = props.user.userData;
    const body = {
      writer: user._id,
      title: productName,
      description: description,
      price: price,
      images: images,
      country: country,
    };
    axios
      .post("/api/product", body)
      .then((_res) => {
        console.log(_res);
        if (_res.data.success) {
          alert("상품 업로드가 완료됐습니다.");
          navigate("/");
        } else {
          alert("상품 업로드가 실패했습니다.");
        }
      })
      .catch((_err) => {
        alert(_err);
      });
  };

  const updateImages = (childComponentImage) => {
    setImages(childComponentImage);
  };

  return (
    <div className="relative my-10 container mx-auto">
      <div className="w-6/12 mx-auto">
        <h1>여행 상품 업로드</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col">
          <FileUpload className="container mx-auto" refreshFunction={updateImages} />
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
          <button className="float-left w-20 border border-2" type="submit">
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;
