export interface IEvent {
  eventId: string;        // GUID
  groundId: string;       // GUID (bạn yêu cầu thêm)
  name: string;           // NVarchar(100)
  price: number;          // Decimal(18,2)
  ticketNumber: number;   // int (default 1)
  level?: string | null;  // NVarchar(255) - cho phép null
}

export class Event implements IEvent {
  eventId: string;
  groundId: string;
  name: string;
  price: number;
  ticketNumber: number;
  level?: string | null;

  constructor(data: Partial<IEvent>) {
    this.eventId = data.eventId ?? crypto.randomUUID();
    this.groundId = data.groundId ?? ""; // bạn có thể set random UUID hoặc để bắt buộc truyền vào
    this.name = data.name ?? "";
    this.price = data.price ?? 0;
    this.ticketNumber = data.ticketNumber ?? 1;
    this.level = data.level ?? null;
  }
}
