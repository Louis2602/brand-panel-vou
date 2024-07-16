export type BRAND_STATUS = "ACTIVE" | "INACTIVE";

export type User = {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  role: BRAND_STATUS;
  createdAt?: string;
  updatedAt?: string;
};
