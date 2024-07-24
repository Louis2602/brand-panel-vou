import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateFallback(str: string) {
  if (!str) return "NN";

  const splittedStr = str.split(" ");
  if (splittedStr.length === 1) {
    return splittedStr[0].slice(0, 2).toUpperCase();
  } else if (splittedStr.length > 1) {
    return `${splittedStr[0][0] + splittedStr[1][0]}`.toUpperCase();
  } else {
    return "NN";
  }
}

export function generateVoucherCode(brandName: string) {
  // Extract the first two letters of the brand name and convert to uppercase
  const prefix = brandName.slice(0, 2).toUpperCase();

  // Function to generate a random alphanumeric character
  function getRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Generate the random 4-character part of the voucher code
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += getRandomChar();
  }

  // Combine the prefix and the random part
  return prefix + randomPart;
}
