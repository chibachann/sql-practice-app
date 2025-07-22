import { Router, Request, Response } from 'express';
import Database from 'better-sqlite3';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, '../db/employee_data.db');
const db = new Database(dbPath);

interface RunSqlRequest extends Request {
  body: {
    sql: string;
  };
}

router.post('/run-sql', (req: RunSqlRequest, res: Response) => {
  const { sql } = req.body;

  if (!sql || typeof sql !== 'string') {
    return res.status(400).json({ success: false, error: 'SQL文が必要です' });
  }

  const trimmed = sql.trim().toUpperCase();
  if (!trimmed.startsWith('SELECT')) {
    return res.status(403).json({ success: false, error: 'SELECT文のみ許可されています' });
  }

  try {
    const stmt = db.prepare(sql);
    const result = stmt.all();
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
