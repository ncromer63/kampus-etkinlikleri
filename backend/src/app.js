import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/event.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    student: '2416501085',
  });
});

app.use('/events', eventRoutes);

// JSON syntax hatası veya beklenmeyen hatalar için genel hata yakalayıcı
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { message: 'Invalid JSON payload' } });
  }
  return res.status(500).json({ error: { message: err.message || 'Internal Server Error' } });
});

export default app;
