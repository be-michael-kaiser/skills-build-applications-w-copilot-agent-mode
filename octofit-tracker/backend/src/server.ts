import cors from 'cors';
import express from 'express';
import './config/database.ts';
import apiRouter from './routes/api.ts';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const allowedOrigins = [
  'http://localhost:5173',
  codespaceName ? `https://${codespaceName}-5173.app.github.dev` : undefined,
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});