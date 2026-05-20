import express from "express";
import cors from "cors";
import newsRoutes from "./src/routes/newsRoutes.js";
import connection from "./src/config/redis.js";

const PORT = 5000;
const app = express();

app.use(cors())

app.use(express.json())

app.use("/api/news",newsRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});