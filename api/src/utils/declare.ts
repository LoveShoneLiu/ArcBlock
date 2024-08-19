/**
 * 定义一个接口 Query，用于表示查询参数
 */
interface Query {
  id: number; // 查询的唯一标识符
};

/**
 * 定义一个接口 ProfileDataType，用于表示用户的个人资料数据
 */
interface ProfileDataType {
  username: string; // 用户名
  email: string; // 用户的电子邮件地址
  phone: string; // 用户的电话号码
  id: number; // 用户的唯一标识符
}

/**
 * 导出 Query 和 ProfileDataType 类型，以便在其他模块中使用
 */
export type {
  Query,
  ProfileDataType
};
