import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload() {
  const [images, setImages] = useState([]);

  const dropHandler = (acceptImages) => {
    let formData = new FormData();
    // ! 파일을 백엔드로 보낼 때 config 설정을 해줘야 에러가 발생하지 않음
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", acceptImages[0]);
    axios.post("/api/product/images", formData, config).then((_res) => {
      //console.log(_res);
      if (_res.data.success) {
        setImages([...images, _res.data.filePath]);
      } else {
        alert("업로드 실패");
      }
    });
  };

  const onDeleteImage = (imageIndex) => {
    let duplicatedImages = [...images];
    duplicatedImages.splice(imageIndex, 1);
    setImages(duplicatedImages);
  };
  return (
    <div className="container flex flex-row">
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section className="mr-10">
            <div className="w-64 h-64 border border-2" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="mt-24 text-5xl font-semibold text-center">+</div>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="flex flex-col w-64 h-64 overflow-x-scroll">
        {images.map((image, index) => {
          return (
            <div onClick={() => onDeleteImage(index)} key={index}>
              <img className="min-w-full w-64 h-64" alt="product" src={`http://localhost:5000/${image}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileUpload;
