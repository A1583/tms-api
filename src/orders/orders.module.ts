import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { LogisticsService } from 'src/logistics/logistics.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, LogisticsService]
})
export class OrdersModule {}
