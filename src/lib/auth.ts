import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function verifyAuthToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Check if user is logged in (client-side)
 * @returns Promise<boolean> - true if user is authenticated, false otherwise
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const token = (await cookies()).get('token')?.value;
  return token ? true : false;
}

