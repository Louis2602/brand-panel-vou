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
  createdAt: string;
  updatedAt: string;
};

export type Promotion = {
  id?: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  promotionRate: string;
  maxQuantity: string;
};
