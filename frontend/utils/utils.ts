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