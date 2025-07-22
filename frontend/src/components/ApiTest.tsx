import { useState } from 'react';
import styles from './ApiTest.module.css';

const ApiTest = () => {
  const [sql, setSql] = useState('SELECT * FROM employees;');
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runSQL = async () => {
    try {
      const res = await fetch('/api/run-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        setError(null);
      } else {
        setResult([]);
        setError('SQL execution failed');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SQL Practice App</h1>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        rows={5}
        className={styles.textarea}
      />
      <br />
      <button onClick={runSQL} className={styles.button}>
        Run SQL
      </button>
      {error && <p className={styles.error}>Error: {error}</p>}
      {result.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              {Object.keys(result[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApiTest;
