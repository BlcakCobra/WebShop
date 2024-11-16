import { Router } from 'express';
import { registerControl } from '../Controller/registerController';
import { loginControll } from '../Controller/loginController';
import { createProductController } from '../Controller/createProductController';
import { getProductsController } from '../Controller/getProductController';
import { updateProductController } from '../Controller/updateProductController';
import { deleteProductController } from '../Controller/deleteProductController';
import { isAdmin } from '../middleWeare/isAdmin';

const router = Router();

router.post('/register', registerControl);
router.post('/login', loginControll);
router.get("/products", getProductsController);
router.post("/products",isAdmin, createProductController);
router.put("/products/:id",isAdmin, updateProductController);
router.delete("/products/:id",isAdmin, deleteProductController);

export default router;