export interface RoomData {
  _id: number;
  image: string;
  title: string;
  adress: string;
  description: string;
}

export type OrderDates = Record<string, Record<string, Record<string, {}>>>;
