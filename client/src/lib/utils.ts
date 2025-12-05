import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/es";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return dayjs(dateString).format("DD/MM/YYYY");
}

export function formatDateTime(dateString: string): string {
  return dayjs(dateString).locale("es").format("D [de] MMMM [de] YYYY");
}
