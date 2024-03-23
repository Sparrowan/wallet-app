import express from 'express';
import walletRoutes from './routes/walletRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();

app.use(express.json());
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/docs/index.html');
  });

export default app;
