import { Router } from 'express';
import { registerControl } from '../Controller/registerController';
import { loginControll } from '../Controller/loginController';

const router = Router();

router.post('/register', registerControl);
router.post('/login', loginControll);
export default router;