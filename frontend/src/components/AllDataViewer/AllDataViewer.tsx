import React, { useEffect, useState } from 'react';
import styles from './AllDataViewer.module.css';

type QueryResult = {
  table: string;
  data: any[];
};

const TABLES = ['departments', 'positions', 'employees', 'salaries', 'attendance'];

const AllDataViewer: React.FC = () => {
  const [results, setResults] = useState<QueryResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableResults: QueryResult[] = [];

        for (const table of TABLES) {
          const res = await fetch('/api/run-sql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql: `SELECT * FROM ${table};` }),
          });

          const json = await res.json();
          if (!json.success) throw new Error(`Failed to load table: ${table}`);

          tableResults.push({ table, data: json.result });
        }

        setResults(tableResults);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>📊 全データ一覧</h2>
      {error && <p className={styles.error}>❌ {error}</p>}
      {results.map(({ table, data }) => (
        <div key={table} className={styles.tableBlock}>
          <h3>{table}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AllDataViewer;
