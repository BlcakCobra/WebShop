import React from "react";

const SelectFewImages: React.FC<{
  images: File[];
  handleImagesUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ images, handleImagesUpload }) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImagesUpload}
      />
      <div>
        {images.length === 0 && <p>No images uploaded</p>}
        {images.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            alt={`Preview ${i}`}
            width={100}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectFewImages;
