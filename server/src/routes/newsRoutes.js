import express from "express";
import { getNews } from "../controllers/newsControllers.js";
import { newsQueue } from "../Queue/newsQueue.js";
import { rssSources } from "../data/rssSources.js";


const router = express.Router();

router.get("/", async (req, res) => {

  for (const rss of rssSources) {

    await newsQueue.add(
      "fetch-news",
      {
        source: rss.source,
        url: rss.url,
      }
    );
  }

  res.json({
    success: true,
    message: "All RSS Jobs Added",
  });

});

export default router;