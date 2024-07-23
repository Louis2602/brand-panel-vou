import { cookies } from "next/headers";
import { Brand } from "@/types/brand";

export function auth(): Brand | null {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");

  if (authCookie) {
    try {
      return JSON.parse(authCookie.value) as Brand;
    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
    }
  }

  return null;
}
