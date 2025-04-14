import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '@/redux/slice/productSlice';
import type { AppDispatch } from '@/redux/store';

const useProductModal = (onClose: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageURL = '';

    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const res = await fetch('/api/imageUpload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          imageURL = data.url;
        } else {
          console.error('Upload failed:', data.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    }

    await dispatch(
      createProduct({
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        companyName,
        imageURL,
      })
    );
    onClose();
  };

  return {
    name,
    price,
    stock,
    companyName,
    imageFile,
    uploading,
    setName,
    setPrice,
    setStock,
    setCompanyName,
    handleFileChange,
    handleSubmit,
  };
};

export default useProductModal;
