'use server';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function login({ access_token, refresh_token, first_visit }) {
  // Create the session expiration time
  const user = { access_token, refresh_token, first_visit };
  const now = Math.floor(Date.now() / 1000);
  const expires = now + 30 * 24 * 60 * 60; // 30 days from now

  cookies().set({
    name: "session",
    value: JSON.stringify(user),
    httpOnly: true,
    expires: new Date(expires * 1000),
    path: '/', // Ensure the cookie is accessible across the whole site
  });
}
export async function logout() {
  // Destroy the session
  cookies().set({
    name: "session",
    value: "",
    expires: new Date(0),
    path: '/', // Ensure the cookie is cleared across the whole site
  });
}

export async function getSession(request) {
  const sessionCookie = cookies(request).get("session");
  if (!sessionCookie) return undefined;

  return JSON.parse(sessionCookie.value);
}

export async function updateSession(request) {
  const sessionCookie = cookies(request).get("session");
  if (!sessionCookie) return;

  const session = JSON.parse(sessionCookie.value);

  // Calculate new expiration time by adding 30 days
  const now = Math.floor(Date.now() / 1000);
  const newExpirationTime = now + 30 * 24 * 60 * 60; // 30 days from now

  session.expires = newExpirationTime;

  const response = NextResponse.next();
  response.cookies.set({
    name: "session",
    value: JSON.stringify(session),
    httpOnly: true,
    expires: new Date(newExpirationTime * 1000),
    path: '/', // Ensure the cookie is updated across the whole site
  });

  return response;
}
