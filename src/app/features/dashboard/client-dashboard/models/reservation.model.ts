export interface Reservation {
  id: number;
  serviceId: number;
  description: string;
  date: Date;
  status: number; // 0 = Confirmed, 1 = Pending, 2 = Cancelled
}
