import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import {
  updateDataApi,
  getDataApi,
} from '../controllers/profileController';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.get('/getData', getDataApi); // 定义一个 GET 路由，用于获取数据
router.post('/updateData', updateDataApi); // 定义一个 POST 路由，用于更新数据


export default router;
