import app from './app';
import { connectToDatabase } from './db';

const PORT = process.env.PORT || 3000;
connectToDatabase()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
