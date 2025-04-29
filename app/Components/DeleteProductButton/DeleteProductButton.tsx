"use client"
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { AsyncDeleteProductSlice, resetSuccess } from '../../store/Slices/DeleteProductSlice';
import { AsyncGettingProductSlice} from "./../../store/Slices/GettingProductSlice"
import styles from "./DeleteProductButton.module.css";

interface DeleteProductButtonType {
  id: string;
}

const DeleteProductButton: React.FC<DeleteProductButtonType> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.deleteProductSlice);

  const handleDeleteProduct = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    await dispatch(AsyncDeleteProductSlice({ token, id }));
  };

  useEffect(() => {
    if (success) {
      dispatch(AsyncGettingProductSlice());
      dispatch(resetSuccess());
    }
  }, [success, dispatch]);

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
