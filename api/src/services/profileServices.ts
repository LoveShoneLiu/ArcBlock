import db from '../models/profileDb';
import type { Request } from 'express';
import { ProfileDataType } from '../utils/declare';

/**
 * 获取指定ID的用户资料
 * @param id - 用户ID
 * @returns 返回一个Promise，包含用户资料
 */
const getProfile = (id: number): Promise<ProfileDataType> => (
  new Promise((resolve, reject) => {
    db.get(`SELECT * FROM profile LIMIT ${id}`, (err: any, row: any) => { // 从数据库中选择指定ID的用户资料
      if (err) {
        reject(err); // 如果有错误，拒绝Promise并返回错误信息
      } else {
        resolve(row); // 如果成功，解析Promise并返回用户资料
      }
    });
  })
);

/**
 * 更新用户资料
 * @param req - Express请求对象，包含用户更新信息
 * @returns 返回一个Promise，包含更新后的用户资料
 */
const updateProfile = (req: Request): Promise<ProfileDataType> => (
  new Promise((resolve, reject) => {
    const { username, email, phone, id } = req.body; // 从请求体中解构出用户信息
    db.run(`UPDATE profile SET username = ?, email = ?, phone = ? WHERE id = ${id}`, [username, email, phone], (err: any) => { // 更新数据库中的用户资料
      if (err) {
        reject(err); // 如果有错误，拒绝Promise并返回错误信息
      } else {
        getProfile(id).then((profile) => { // 更新成功后，获取更新后的用户资料
          resolve(profile); // 解析Promise并返回更新后的用户资料
        }).catch((err) => {
          reject(err); // 如果获取资料失败，拒绝Promise并返回错误信息
        })
      }
    });
  })
);

export {
  getProfile,
  updateProfile,
};
