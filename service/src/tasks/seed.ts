import { Injectable, Module } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
const content =
  '<p>It is very hard to navigate the american restaurant landscape as a foreigner.</p><p>Much is awful.</p><p>I have never eaten a meal worth its price at a chain restaurant and too many does not cook their own food but rely on frozen and thawed.</p><p>Avoid almost all italian</p><p>Latin is usually great since kitchen staff usually are latinos and know their studd, so you can always order a Cubano and never be dissapointed.</p><p>Korean and korean-latin fusion in LA is also great</p><p>Also rural BBQ. If they have more pickup trucks than you can count outside it will be amazing</p><p>And then there are hidden gems all over the place but they are usually hard to find and tends to be booked.</p><p>I find Eater one of the few reliable guides. All that allow user feedback are suffering from the fact that most americans simply just do not understand food beyond large portions and sugar everywhere</p><p>Diner breakfasts are fine most of the time but then, have can you fail doing eggs and bacon?</p><p><img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg"/></p><p><br></p><p>It is very hard to navigate the american restaurant landscape as a foreigner.</p><p>Much is awful.</p><p>I have never eaten a meal worth its price at a chain restaurant and too many does not cook their own food but rely on frozen and thawed.</p><p>Avoid almost all italian</p><p>Latin is usually great since kitchen staff usually are latinos and know their studd, so you can always order a Cubano and never be dissapointed.</p><p>Korean and korean-latin fusion in LA is also great</p><p>Also rural BBQ. If they have more pickup trucks than you can count outside it will be amazing</p><p>And then there are hidden gems all over the place but they are usually hard to find and tends to be booked.</p><p>I find Eater one of the few reliable guides. All that allow user feedback are suffering from the fact that most americans simply just do not understand food beyond large portions and sugar everywhere</p><p>Diner breakfasts are fine most of the time but then, have can you fail doing eggs and bacon?</p>';
@Injectable()
export class TaskRunner {
  constructor(private readonly prisma: PrismaService) {}

  async run() {
    await this.prisma.blog.deleteMany({});
    await this.prisma.user.deleteMany({});
    const data = await this.prisma.user.create({
      data: {
        displayName: 'user1',
        email: 'user1@gmail.com',
        role: UserRole.USER,
      },
    });
    for (let i = 1; i < 4; i++) {
      await this.prisma.blog.create({
        data: {
          title: `What is your review of American cuisine as a foreigner-${i}`,
          createdBy: data.id,
          thumImg:
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
          content: content,
          shortContent:
            'The cuisine in America is excellent. Since there are so many from just about every country, you will find all kinds of different foods, and most all are wonderful. Of course, there are some who prepare similar countries’ foods differently, i.e',
        },
      });
      await this.prisma.blog.create({
        data: {
          title: `Do white Americans eat soul food such as fried chicken, black eyed peas, collard greens, cornbread, and coleslaw?-${i}`,
          createdBy: data.id,
          thumImg:
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
          content: content,
          shortContent:
            'I lived in the Deep South for ten years and every item on your list is commonly served in both black and white households in the community where I lived. Foods like black-eyed peas and collard greens are Southern food.',
        },
      });
    }

    const data2 = await this.prisma.user.create({
      data: {
        displayName: 'user2',
        email: 'user2@gmail.com',
        role: UserRole.USER,
      },
    });
    for (let i = 1; i < 10; i++) {
      await this.prisma.blog.create({
        data: {
          title: `What do people in other countries typically deem to be American foods? It seems that a lot of food we eat in America is borrowed from other cultures and wouldn’t be “American” foods-${i}`,
          createdBy: data2.id,
          thumImg:
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
          content: content,
          shortContent:
            'Greens are a popular vegetable side dish in the Deep South. One of the biggest sources of ‘culinary culture shock’ I experienced when I move',
        },
      });
    }
  }
}

@Module({
  providers: [TaskRunner, PrismaService],
  exports: [TaskRunner],
})
export class TaskModule {}
