import { Observable } from "rxjs";
import { TrackingInfoDto } from "./dto/TrackingInfoDto.dto";

export interface Logistics {
    getLatestTrackingStatus(
        trackingNumbers: string[],
      ): Observable<TrackingInfoDto[]>;
    
      getTrackingData(trackingNumner: string): Observable<TrackingInfoDto>
}
