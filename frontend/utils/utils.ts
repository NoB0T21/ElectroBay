'use cilent'
import { Products, User } from "./types";

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const userDetails = (): User | null => {
  if (typeof window === "undefined") return null;
  
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};


export const setProduct = ({data}:{data:Products}) => {
  localStorage.setItem('product',JSON.stringify(data))
}
export const getProduct = () => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("product");
  return data ? JSON.parse(data) : null;
}

export const numConvert = (value: number): string => {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return value.toString();
};