import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/Fb";
import "./imgUpload.css";
import { useNavigate } from "react-router-dom";

const ImageUploader = ({ setUrl, usernickname, uploadTrigger }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [signup, setsignup] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (uploadTrigger === true) {
      uploadImage();
    }
  }, [uploadTrigger]);

  useEffect(() => {
    if (signup === true) {
      navigate("/askme");
    }
  }, [signup]);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setFile(resizedFile);
              setPreviewUrl(URL.createObjectURL(resizedFile));
              setError(""); // 에러 메시지 초기화
            } else {
              setError("이미지 변환 중 오류가 발생했습니다.");
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        setError("이미지를 로드하는 중 오류가 발생했습니다.");
      };
    }
  };

  const uploadImage = () => {
    if (!file) return;
    const fileRef = ref(storage, `images/${usernickname}`);
    // 테스트용 const fileRef = ref(storage, `images/캉캉`);
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully!");
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("저장경로 확인 : " + url);
          setUrl(url);
          setsignup(true);
        });
      })
      .catch((error) => {
        console.error("파일 업로드 중 오류가 발생했습니다:", error);
        setError("파일 업로드 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="fileupload">
      <input
        type="file"
        onChange={handleFileInputChange}
        className="fileselect"
      />
      {previewUrl && (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="preview" />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
