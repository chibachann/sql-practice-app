import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, 'sample.db'));

db.exec(`
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  );

  INSERT INTO users (name, age) VALUES
    ('田中 太郎', 25),
    ('John Smith', 32),
    ('山田 花子', 29);
`);

console.log('✅ DB初期化完了');
