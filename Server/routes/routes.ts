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
import { createProductDetailsController } from '../Controller/createProductDetailsController';
import { SearchAnyProductController } from '../Controller/SearchAnyProductController';
import { filterSearchedProducts } from '../Controller/controllerForProducts/filterSearchedProductsController';

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
router.post("/createProductDetails/:productId",isAdmin,createProductDetailsController)
router.get("/searchAnything",SearchAnyProductController)
router.get("/searchResaultFilter",filterSearchedProducts)
export default router;