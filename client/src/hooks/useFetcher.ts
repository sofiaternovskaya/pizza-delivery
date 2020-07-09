import useAuth from "./useAuth";

export const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

export function useFetcher() {
  const { clearAuth } = useAuth();

  return async function fetcher(input: string, init?: RequestInit | undefined) {
    const res = await fetch(BASE_URL + input, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...init,
    });

    if (res.status === 403 || res.status === 401) {
      clearAuth();
      throw new Error("Please login first!");
    }

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    if (res.headers?.get("content-type")?.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  };
}
