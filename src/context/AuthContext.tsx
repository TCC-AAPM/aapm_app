import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, ApiError, getToken, setToken, setUnauthorizedHandler } from '../services/api';
import { Profile, toProfile } from '../services/profile';
import { navRef } from '../navigation/ref';

type Ctx = {
  user: Profile | null;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  restore: () => Promise<boolean>;
};
const AuthCtx = createContext<Ctx>(null as unknown as Ctx);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);

  const loadMe = async () => setUser(toProfile(await api('/Alunos/me')));
  const signOut = async () => { await setToken(null); setUser(null); };

  // Token expirado/inválido em qualquer chamada → volta para o login.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      if (navRef.isReady() && navRef.getCurrentRoute()?.name !== 'Login') navRef.reset({ index: 0, routes: [{ name: 'Login' }] });
    });
  }, []);

  const signIn = async (email: string, senha: string) => {
    const d = await api<any>('/Login', { method: 'POST', auth: false, body: { email: email.trim(), senha } });
    const t = typeof d === 'string' ? d : d?.token ?? d?.accessToken ?? d?.jwt;
    if (!t) throw new ApiError('Resposta de login inesperada.', 500);
    await setToken(t);
    try { await loadMe(); } catch (e) {
      await signOut();
      if (e instanceof ApiError && [401, 403, 404].includes(e.status)) throw new ApiError('Este app é exclusivo para alunos.', 403);
      throw e;
    }
  };

  /** Sessão salva? Valida o token e carrega o perfil. */
  const restore = async () => {
    if (!(await getToken())) return false;
    try { await loadMe(); return true; } catch (e) {
      if (!(e instanceof ApiError) || e.status !== 0) await setToken(null);
      return false;
    }
  };

  return <AuthCtx.Provider value={{ user, signIn, signOut, refresh: loadMe, restore }}>{children}</AuthCtx.Provider>;
}
