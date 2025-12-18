import { ApiRequestError, type ApiResponse } from './types';

type ApiRequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: HeadersInit;
  token?: string | null;
};

function resolveBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return configured?.replace(/\/$/, '') ?? '';
}

function buildHeaders(options: ApiRequestOptions): HeadersInit {
  const headers = new Headers(options.headers);

  const isFormDataBody =
    typeof FormData !== 'undefined' && options.body instanceof FormData;
  if (!isFormDataBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  return headers;
}

async function tryReadJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const baseUrl = resolveBaseUrl();
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: buildHeaders(options),
  });

  const json = (await tryReadJson(res)) as ApiResponse<T> | null;

  if (!res.ok) {
    const fallbackMessage = `Request failed (${res.status})`;
    if (json && typeof json === 'object' && 'message' in json) {
      throw new ApiRequestError(String(json.message ?? fallbackMessage), {
        status: res.status,
        errors: (json as { errors?: string[] | null }).errors ?? null,
      });
    }
    throw new ApiRequestError(fallbackMessage, { status: res.status });
  }

  if (!json) {
    throw new ApiRequestError('Invalid server response (expected JSON).', {
      status: res.status,
    });
  }

  if (!json.success) {
    throw new ApiRequestError(json.message || 'Request failed.', {
      status: json.statusCode,
      errors: json.errors ?? null,
    });
  }

  return json.data;
}

