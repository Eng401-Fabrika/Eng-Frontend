export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors?: string[] | null;
};

export class ApiRequestError extends Error {
  status?: number;
  errors?: string[] | null;

  constructor(message: string, options?: { status?: number; errors?: string[] | null }) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = options?.status;
    this.errors = options?.errors;
  }
}

