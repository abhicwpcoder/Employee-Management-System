process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});