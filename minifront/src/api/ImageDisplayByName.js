import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../api/Fb";

const ImageDisplayByName = ({ filename }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (filename) {
      const imageRef = ref(storage, `images/${filename}`);
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("이미지 다운로드 URL 가져오기 실패:", error);
        });
    }
  }, [filename]);

  return (
    <div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{
            maxWidth: "100px",
            border: "1px solid white",
            borderRadius: "100%",
          }}
        />
      )}
    </div>
  );
};

export default ImageDisplayByName;
