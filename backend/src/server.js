import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

try {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`[api] http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("[db] bağlantı hatası:", err.message);
  process.exit(1);
}
