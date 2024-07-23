export type BRAND_STATUS = "ACTIVE" | "INACTIVE";

export type Brand = {
  id: string;
  name: string;
  brandName: string;
  industry: string;
  address: string;
  latitude: string;
  longitude: string;
  role: BRAND_STATUS;
  createdAt: Date;
  updatedAt: Date;
};

export type Event = {
  id: string;
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
  games: string[];
};
