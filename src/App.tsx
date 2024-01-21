import { useState } from 'react';

const cloudinaryConfig = {
  cloudName: 'doavylikc',
};

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "hpa89cjp");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    console.log('Réponse de Cloudinary:', data);
    setImageUrl(data.secure_url);

  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={uploadFile}>Télécharger</button>
      {imageUrl && <img src={imageUrl} />}
    </div>
  );
};