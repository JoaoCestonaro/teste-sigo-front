export type ApiResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const parseBody = (body: unknown) => {
  if (body === undefined || body === null) return undefined;
  if (body instanceof FormData) return body;
  if (typeof body === "string") return body;
  return JSON.stringify(body);
};

const parseResponse = async (response: Response) => {
  const raw = await response.text();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export async function fetchJson(
  baseUrl: string,
  path: string,
  options: FetchOptions = {}
): Promise<ApiResult> {
  const cleanBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  const url = `${cleanBaseUrl}${path}`;

  const headers = new Headers(options.headers);
  if (options.method && options.method !== "GET") {
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: parseBody(options.body),
    });

    const data = await parseResponse(response);

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: {
        Message:
          error instanceof Error
            ? error.message
            : "Failed to reach the API",
      },
    };
  }
}
