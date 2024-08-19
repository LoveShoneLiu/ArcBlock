import type { Request, Response } from 'express';
import { getProfile, updateProfile } from '../services/profileServices';
import { Query, ProfileDataType } from '../utils/declare';

/**
 * 获取用户数据的API
 * @param req - 请求对象，包含查询参数
 * @param res - 响应对象，用于返回数据
 */
const getDataApi = async (req: Request, res: Response) => {
  const { id } = req.query as unknown as Query; // 从请求的查询参数中获取用户ID
  try {
    const profileData: ProfileDataType = await getProfile(id); // 调用服务层方法获取用户数据
    res.json({
      code: 0,
      message: 'success',
      data: profileData, // 返回成功响应和用户数据
    });
  } catch (err) {
    res.status(500).send({
      code: 1,
      message: 'fail',
      data: err, // 返回失败响应和错误信息
    });
  }
}

/**
 * 更新用户数据的API
 * @param req - 请求对象，包含更新数据
 * @param res - 响应对象，用于返回数据
 */
const updateDataApi = async (req: Request, res: Response) => {
  try {
    const profileData: ProfileDataType = await updateProfile(req); // 调用服务层方法更新用户数据
    res.json({
      code: 0,
      message: 'success',
      data: profileData, // 返回成功响应和更新后的用户数据
    });
  } catch (err) {
    res.status(500).send({
      code: 1,
      message: 'fail',
      data: err, // 返回失败响应和错误信息
    });
  }
}

export {
  getDataApi,
  updateDataApi,
};
