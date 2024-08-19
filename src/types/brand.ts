export type STATUS = "ACTIVE" | "INACTIVE";

export type Brand = {
  id: string;
  name: string;
  brandName: string;
  industry: string;
  address: string;
  latitude: string;
  longitude: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
};

export type Event = {
  id?: string;
  name: string;
  image: string;
  startTime?: Date;
  endTime?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEvent = {
  brandId: string;
  name: string;
  image: string | ArrayBuffer | null;
  startTime: Date;
  endTime: Date;
  gameId: string;
};

export type Voucher = {
  id?: string;
  code: string;
  qrCode: string;
  image: string;
  value: number;
  description: string;
  expiredDate: Date;
  status: string;
  artifactsNeeded: number;
  amount: number;
  eventId: string;
  brandId: string;
};

export type Artifact = {
  id?: string;
  name: string;
  image: string;
  eventId: string;
};
