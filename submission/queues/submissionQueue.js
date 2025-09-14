import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(); 

const submissionQueue = new Queue("submission", { connection });

export default submissionQueue;
