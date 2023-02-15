import { Injectable } from '@nestjs/common';
import { Logistic, Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { TrackingInfoDto } from './dto/TrackingInfoDto.dto';
import { TrackingStatusDto } from './dto/TrackingStatusDto.dto';
import { FlashResponseDto } from './flash/dto/flashResponse.dto';

@Injectable()
export class LogisticsService {
  constructor(private prisma: PrismaService) {}

  async getLogistic(
    logisticsWhereUniqueInput: Prisma.LogisticWhereUniqueInput,
  ): Promise<Logistic | null>{
    return this.prisma.logistic.findUnique({
      where: logisticsWhereUniqueInput
    })
  };
}
