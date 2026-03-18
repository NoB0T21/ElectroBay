'use server'
import { cookies } from "next/headers";

const cookieOptions = {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: "lax" as const,
  secure: true,
} 

export const setTokenCookie = async (t: string) => {
  (await cookies()).set("token", t, cookieOptions)
}