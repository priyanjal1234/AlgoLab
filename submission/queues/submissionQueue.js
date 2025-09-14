import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(); // defaults: 127.0.0.1:6379

const submissionQueue = new Queue("submissions", { connection });

export default submissionQueue;
