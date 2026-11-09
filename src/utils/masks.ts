const d = (v: string) => v.replace(/\D/g, '');
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
