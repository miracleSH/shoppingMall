import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
function FileUpload() {
  const dropHandler = (acceptImages) => {
    let formData = new FormData();

    // ! 파일을 백엔트로 보낼 때 config 설정을 해줘야 에러가 발생하지 않음
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", acceptImages[0]);
    axios.post("/api/product/images", formData, config).then((_res) => {
      console.log(_res);
      if (_res.data.success) {
      } else {
        alert("업로드 실패");
      }
    });
  };
  return (
    <div>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="w-100 h-40 border border-2" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="mt-12 text-5xl font-semibold text-center">+</div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
