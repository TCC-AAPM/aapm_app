import * as SecureStore from 'expo-secure-store';

export const BASE_URL = 'https://tcc-aapm.onrender.com/api';
const KEY = 'aapm_token';

let token: string | null = null;
let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: () => void) => { onUnauthorized = fn; };

export const getToken = async () => token ?? (token = await SecureStore.getItemAsync(KEY));
export const setToken = async (t: string | null) => {
  token = t;
  if (t) await SecureStore.setItemAsync(KEY, t); else await SecureStore.deleteItemAsync(KEY);
};

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
export const errMsg = (e: unknown) => (e instanceof ApiError ? e.message : 'Algo deu errado. Tente novamente.');
/** Lê a primeira chave existente (a API pode variar o nome do campo). */
export const pick = (o: any, ...keys: string[]) => { for (const k of keys) if (o?.[k] != null) return o[k]; return undefined; };

type Opts = { method?: string; body?: unknown; auth?: boolean };

export async function api<T = any>(path: string, { method = 'GET', body, auth = true }: Opts = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) { const t = await getToken(); if (t) headers.Authorization = `Bearer ${t}`; }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000); // Render free "acorda" devagar
  try {
    const res = await fetch(BASE_URL + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: ctrl.signal });
    const text = await res.text();
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text || null; }
    const obj = json && typeof json === 'object' ? json : null;
    if (res.status === 401 && auth) { await setToken(null); onUnauthorized?.(); }
    if (!res.ok || obj?.sucesso === false) {
      const first = obj?.errors ? (Object.values(obj.errors).flat()[0] as string) : undefined;
      throw new ApiError(obj?.mensagem || obj?.message || first || obj?.title || `Erro ${res.status}`, res.status);
    }
    return (obj && !Array.isArray(obj) && 'dados' in obj ? obj.dados : json) as T;
  } catch (e: any) {
    if (e instanceof ApiError) throw e;
    throw new ApiError(e?.name === 'AbortError' ? 'O servidor demorou para responder. Tente novamente.' : 'Sem conexão com o servidor.', 0);
  } finally { clearTimeout(timer); }
}
