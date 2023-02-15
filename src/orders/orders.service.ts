import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderRequestDto } from './dto/CreateOrderRequestDto.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ModuleRef } from '@nestjs/core';

import { Order, Prisma } from '@prisma/client';
import { LogisticsService } from 'src/logistics/logistics.service';
import { TrackingInfoDto } from 'src/logistics/dto/TrackingInfoDto.dto';
import { Logistics } from 'src/logistics/logistics.interface';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logisticsService: LogisticsService,
    private readonly moduleRef: ModuleRef,
  ) {}

  async create(createOrderDto: CreateOrderRequestDto): Promise<Order  
   > {
    try {
      let logisticId = createOrderDto.logistic_id;
      let trackingNumber = createOrderDto.tracking_number;
      let logistic = await this.logisticsService.getLogistic({
        id: logisticId,
      });

      let logisticCode = logistic.code;

      const logistics: Logistics = this.moduleRef.get<Logistics>(logisticCode, {
        strict: false,
      });
  
      let trackingInfoDto: TrackingInfoDto = await logistics.getTrackingData(trackingNumber).toPromise();

      console.log('trackingInfoDto: ', trackingInfoDto);

      const data: Prisma.OrderCreateInput = {
        trackingNumber: trackingNumber,
        amount: new Prisma.Decimal(createOrderDto.amount),
        shippingFee: new Prisma.Decimal(createOrderDto.shipping_fee),
        customerProvince: trackingInfoDto.customerProvince,
        shopProvince: trackingInfoDto.shopProvince,
        currentStatus: trackingInfoDto.status,
        logistic: {
          connect: { id: logisticId },
        },
        createdBy: 'system',
      };

      console.log(data);

      return this.prisma.order.create({ data });
      // console.log('result: ', result);
    } catch (err) {
      throw err;
    }

    // return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
