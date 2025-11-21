const BASE_URL = import.meta.env.VITE_P9_BASE_URL ?? "";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as Record<string, unknown>).message)
        : undefined) || response.statusText || "API request failed";

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export const apiClient = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, { method: "GET" });
  },
  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, { method: "POST", body: JSON.stringify(body ?? {}) });
  }
};
