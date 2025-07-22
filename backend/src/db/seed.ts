import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(__dirname, './employee_data.db');
const INIT_SQL_PATH = path.resolve(__dirname, '../schema/init.sql');

try {
  // DBファイルが存在しない場合、自動作成される
  const db = new Database(DB_PATH);

  // SQLファイル読み込み
  const initSQL = fs.readFileSync(INIT_SQL_PATH, 'utf-8');

  // トランザクションで実行（安全性を高める）
  const exec = db.transaction(() => {
    db.exec(initSQL);
  });

  exec();

  console.log('✅ データベース初期化完了（init.sql 適用済）');
  db.close();
} catch (error) {
  console.error('❌ データベース初期化に失敗しました:', error);
  process.exit(1);
}
