import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { PostService } from './post/post.service';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from './orders/orders.module';
import { LogisticsModule } from './logistics/logistics.module';
import { FlashService } from './logistics/flash/flash.service';

@Module({
  imports: [HttpModule, OrdersModule, LogisticsModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, PostService, FlashService],
})
export class AppModule {}
