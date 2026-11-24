const d = (v: string) => v.replace(/\D/g, '');
export const onlyDigits = d;
export const toISO = (br: string) => { const [dd, mm, yy] = br.split('/'); return `${yy}-${mm}-${dd}`; };
export const fromISO = (iso?: string) => { if (!iso) return ''; const [y, m, dd] = iso.slice(0, 10).split('-'); return `${dd}/${m}/${y}`; };
export const validDate = (s: string) => {
  const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if (!m) return false;
  const [dd, mm, yy] = [+m[1], +m[2], +m[3]]; const t = new Date(yy, mm - 1, dd);
  return t.getFullYear() === yy && t.getMonth() === mm - 1 && t.getDate() === dd && yy > 1900 && t <= new Date();
};
export const validCPF = (v: string) => {
  const c = d(v); if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  for (const t of [9, 10]) { let s = 0; for (let i = 0; i < t; i++) s += +c[i] * (t + 1 - i); if (((s * 10) % 11) % 10 !== +c[t]) return false; }
  return true;
};
export const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
export const maskDate = (v: string) => d(v).slice(0, 8).replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
export const maskCPF = (v: string) => d(v).slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
export const maskPhone = (v: string) => d(v).slice(0, 11).replace(/(\d{2})(\d)/, '($1)$2').replace(/(\(\d{2}\)\d{5})(\d)/, '$1-$2');
export const ageFromBR = (s: string) => {
  const [dd, mm, yy] = s.split('/').map(Number);
  if (!dd || !mm || !yy) return 99;
  const t = new Date(); let a = t.getFullYear() - yy;
  if (t < new Date(t.getFullYear(), mm - 1, dd)) a--;
  return a;
};
