import { Module } from '@nestjs/common';
import { FlashService } from './flash/flash.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'FLH',
      useClass: FlashService,
    },
  ],
  exports: ['FLH'],
})
export class LogisticsModule {}
