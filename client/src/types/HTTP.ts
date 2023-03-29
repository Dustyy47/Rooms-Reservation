export enum Status {
  pending,
  fulfiled,
  rejected
}

export interface AuthTokenDecoded {
  _id: string;
  isAdmin: boolean;
}

export interface ApiError {
  message: string;
}
