const sqlite3 = require('sqlite3').verbose();

// 初始化 SQLite 数据库
const db = new sqlite3.Database('./user_profile.db');

db.serialize(() => {
  // 如果 profile 表不存在，则创建该表
  db.run(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `);

  // 如果表为空，则插入初始数据
  db.get("SELECT COUNT(*) AS count FROM profile", (err: any, row: { count: number; }) => {
    if (err) {
      console.error('Error checking profile count:', err); // 检查 profile 表记录数时出错
    } else {
      if (row.count === 0) { // 插入初始数据
        db.run("INSERT INTO profile (username, email, phone) VALUES (?, ?, ?)", ["admin", "admin@qq.com", "13393333333"]);
      }
    }
  });
});

export default db;