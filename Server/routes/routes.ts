import { Router } from 'express';
import { registerControl } from '../Controller/registerController';
import { loginControll } from '../Controller/loginController';
import { createProductController } from '../Controller/createProductController';
import { getProductsController } from '../Controller/getProductController';
import { updateProductController } from '../Controller/updateProductController';
import { deleteProductController } from '../Controller/deleteProductController';
import { isAdmin } from '../middleWeare/isAdmin';
import { refreshToken } from '../middleWeare/RefreshToken';
import { ProductsWithSpecificType } from '../Controller/getProductsWithSpecificType';
import { getProductById } from '../Controller/getProductById';

const router = Router();

router.post('/register', registerControl);
router.post('/refresh-token',refreshToken);
router.post('/login', loginControll);
router.get("/getAllProducts", getProductsController);
router.post("/createProducts",isAdmin, createProductController);
router.put("/updateProduct/:id",isAdmin, updateProductController);
router.delete("/deleteProduct/:id",isAdmin, deleteProductController);
router.get('/productType/:type', ProductsWithSpecificType);
router.get("/product/:id", getProductById);
 
export default router;