import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import sqlRouter from './routes/sql';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', sqlRouter);


app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
