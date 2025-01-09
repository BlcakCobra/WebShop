import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { AsyncDeleteProductSlice } from '../../store/Slices/DeleteProductSlice';
import styles from "./DeleteProductButton.module.css"


interface DeleteProductButtonType {
  id: string;
}

const DeleteProductButton: React.FC<DeleteProductButtonType> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.deleteProductSlice);

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      await dispatch(AsyncDeleteProductSlice({ token, id }));
      console.log(`Product with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteProduct} disabled={loading} className={styles.DeleteBut}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeleteProductButton;
