export type Promotion = {
  id?: string;
  name: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  promotionRate: string;
  maxQuantity: string;
};
