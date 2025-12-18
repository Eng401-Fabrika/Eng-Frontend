export type JwtUser = {
  id: string;
  email?: string;
  name?: string;
  roles: string[];
};

const CLAIMS = {
  role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  name: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  nameId: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
} as const;

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(base64Url.length / 4) * 4, '=');

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeJwtPayload(token: string): Record<string, unknown> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format.');

  const bytes = base64UrlToUint8Array(parts[1]);
  const jsonText = new TextDecoder('utf-8').decode(bytes);
  return JSON.parse(jsonText) as Record<string, unknown>;
}

export function getUserFromToken(token: string): JwtUser {
  const payload = decodeJwtPayload(token);

  const rawRoles = payload[CLAIMS.role];
  const roles =
    typeof rawRoles === 'string'
      ? [rawRoles]
      : Array.isArray(rawRoles)
        ? rawRoles.filter((r): r is string => typeof r === 'string')
        : [];

  const emailClaim = payload[CLAIMS.email];
  const nameClaim = payload[CLAIMS.name];

  return {
    id: String(payload[CLAIMS.nameId] ?? ''),
    email: typeof emailClaim === 'string' ? emailClaim : undefined,
    name: typeof nameClaim === 'string' ? nameClaim : undefined,
    roles,
  };
}
