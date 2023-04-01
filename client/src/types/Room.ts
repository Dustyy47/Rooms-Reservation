export interface RoomData {
  _id: number;
  imageHref: string;
  name: string;
  adress: string;
  description: string;
}

export type OrderDates = Record<string, Record<string, Record<string, {}>>>;
