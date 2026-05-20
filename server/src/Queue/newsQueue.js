import { Queue } from "bullmq";

import connection from "../config/redis.js";


export const newsQueue = new Queue(
    "newsQueue",
    {
        connection,
    }
);