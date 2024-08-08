import { default as express } from 'express';
import { init_value } from '../controllers/controller.mjs';

export const router = express.Router();

router.get('/init_value', init_value)
