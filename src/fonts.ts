import { Inter, Unbounded } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600","700"],
  variable: "--font-unbounded"
});