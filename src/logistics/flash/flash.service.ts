import { HttpServer, Injectable, Logger } from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrackingStatusDto } from '../dto/TrackingStatusDto.dto';
import { LogisticsService } from '../logistics.service';
import * as _ from 'lodash';
import { FlashResponseDto } from './dto/flashResponse.dto';
import { HttpService } from '@nestjs/axios';
import { CreateOrderRequestDto } from 'src/orders/dto/CreateOrderRequestDto.dto';
import { TrackingInfoDto } from '../dto/TrackingInfoDto.dto';
import { Logistics } from '../logistics.interface';

@Injectable()
export class FlashService implements Logistics {
  constructor(private readonly httpService: HttpService) {}

  private logger: Logger = new Logger(FlashService.name);

  getLatestTrackingStatus(
    trackingNumbers: string[],
  ): Observable<TrackingInfoDto[]> {
    console.log('aaaaaaaaaaaa');

    if (_.size(trackingNumbers) === 0) return;

    let search =
      _.size(trackingNumbers) > 1
        ? _.join(trackingNumbers, ', ')
        : trackingNumbers[0];

    let body: any = { search };

    // return this.httpService
    //   .post('https://www.flashexpress.co.th/webApi/tools/tracking', body)
    //   .pipe(
    //     map((response: any) => {

    //       return response.data.data.list.map((item: any) => {
    //         const flashResponseDto: FlashResponseDto = {
    //           trackingNumber: item.search_no,
    //           status: item.state_text,
    //           customerProvince: item.src_province_name,
    //           shopProvince: item.dst_province_name,
    //         };
    //         return flashResponseDto;
    //       });
    //     }),
    //     catchError((err) => {
    //       this.logger.error(
    //         `Error getting latest tracking status from FLASH of tracking numbers: ${JSON.stringify(
    //           trackingNumbers,
    //         )}`,
    //         err,
    //       );
    //       return of([]);
    //     }),
    //   );
  }

  getTrackingData(trackingNumber: string): Observable<TrackingInfoDto> {
    let body: any = { search: trackingNumber };
    console.log(`getTrackingData(${trackingNumber})`);
    
    return this.httpService
      .post('https://www.flashexpress.co.th/webApi/tools/tracking', body)
      .pipe(
        map((response) => {
          let item = _.first(_.get(response.data, 'data.list', []));

          let dto = new TrackingInfoDto();
          dto.trackingNumber = _.get(item, 'search_no');
          dto.status = _.get(item, 'state_text');
          dto.customerProvince = _.get(item, 'src_province_name');
          dto.shopProvince = _.get(item, 'dst_province_name');

          return dto;
        }),
        catchError((err) => {
          this.logger.error(
            `Error getting latest tracking status from FLASH of tracking numbers: trackingNumber
            `,
            err,
          );
          return of();
        }),
      );
  }
}
