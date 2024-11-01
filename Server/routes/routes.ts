import { Router } from 'express';
import { registerControl } from '../Controller/registerController';
import { loginControll } from '../Controller/loginController';
import { createProductController } from '../Controller/createProductController';

const router = Router();

router.post('/register', registerControl);
router.post('/login', loginControll);
router.post('/allClothes',createProductController)
export default router;