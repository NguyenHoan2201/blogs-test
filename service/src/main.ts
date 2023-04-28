import { server } from './server';
import { task } from './task';
async function run() {
  if (process.env.TASK) {
    try {
      await task.run(process.env.TASK);
      return;
    } catch (err) {
      console.log(err);
      process.exit(0);
    }
  }
  await server.run();
}

run();
