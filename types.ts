
export enum UserRole {
  LEADER = 'LEADER',
  DRIVER = 'DRIVER'
}

export enum TransportStatus {
  LOADING = '装货中',
  IN_TRANSIT = '运输中',
  UNLOADING = '卸货中',
  COMPLETED = '已完成',
  ABNORMAL = '异常'
}

export interface DetailedOrder {
  id: string;
  plateNumber: string;
  cargoType: string;
  sender: string;
  receiver: string;
  createdAt: string;
  status: TransportStatus;
  
  // All Process Data
  weighbridge?: {
    weight: number;
    time: string;
  };
  gate?: {
    photo: string;
    time: string;
  };
  obd?: {
    path: { lat: number; lng: number }[];
    mileage: number;
    stops: number;
  };
  dumping?: {
    photo: string;
    location: string;
    coordinates: string;
    time: string;
  };
}
