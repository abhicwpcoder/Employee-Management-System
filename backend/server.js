import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});



// Handle graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//   });
// });