import { Worker } from "bullmq";

import connection from "../config/redis.js";

import prisma from "../config/db.js";

import Parser from "rss-parser";

const parser = new Parser();

const worker = new Worker(

  "newsQueue",

  async (job) => {

    console.log("Processing Job...");

    console.log("Source:", job.data.source);

    const feed = await parser.parseURL(
      job.data.url
    );

    console.log(
      `Fetched ${feed.items.length} articles`
    );

    const articles = feed.items.map((item) => ({

      title:
        item.title || "",

      description:
        item.contentSnippet || "",

      url:
        item.link || "",

      image:
        item.enclosure?.url || null,

      source:
        job.data.source,

      publishedAt:
        item.pubDate
          ? new Date(item.pubDate)
          : null,
    }));


    for (const article of articles) {

      try {

        await prisma.news.create({
          data: article,
        });

        console.log(
          "Saved:",
          article.title
        );

      } catch (error) {

        console.log(
          "Duplicate Skipped"
        );
      }
    }

  },

  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job Completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job Failed: ${job.id}`);
  console.log(err.message);
});

console.log("Worker Started...");