import { INestApplicationContext, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { accessSync, constants, PathLike } from 'fs';
import path from 'path';

declare function require(name: string): any;

class Task {
  private app: INestApplicationContext;

  async run(taskName: string): Promise<void> {
    const f: PathLike = path.join(__dirname, 'tasks', taskName);

    try {
      if (f.includes('dist')) {
        accessSync(`${f}.d.ts`, constants.R_OK);
      } else {
        accessSync(`${f}.ts`, constants.R_OK);
      }
    } catch (e) {
      throw new Error(`unknown task ${taskName}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const task = require(f);

    @Module({
      imports: [task.TaskModule],
    })
    class TasksModule {}

    this.app = await NestFactory.createApplicationContext(TasksModule, {
      logger: false,
    });
    const service = await this.app.resolve(task.TaskRunner);

    try {
      await service.run();
    } catch (e) {
      console.log(e);
    }

    await this.stop();
  }

  async stop() {
    if (this.app) {
      await this.app.close();
    }
  }
}

export const task = new Task();
