import { pick } from './api';

export type Profile = {
  id?: number; nome: string; nomeSocial?: string; cpf: string; matricula: string; telefone: string; email: string; dataNasc: string;
  curso: string; turma: string; armario?: string | number; vencimento?: string; pagamento?: string;
};

const txt = (v: any) => (v == null ? '' : String(v));
const nameOf = (v: any, ...k: string[]) => (v && typeof v === 'object' ? pick(v, ...k) : v);

/** Normaliza o retorno de GET /Alunos/me (o Swagger não documenta o corpo; ajuste as chaves se precisar). */
export function toProfile(d: any): Profile {
  if (__DEV__) console.log('[Alunos/me]', JSON.stringify(d));
  const r = d?.reserva ?? (typeof d?.armario === 'object' ? d.armario : {}) ?? {};
  return {
    id: pick(d, 'id', 'idAluno', 'idUsuario'),
    nome: txt(pick(d, 'nome')), nomeSocial: pick(d, 'nomeSocial') || undefined,
    cpf: txt(pick(d, 'cpf')), matricula: txt(pick(d, 'matricula')), telefone: txt(pick(d, 'telefone')),
    email: txt(pick(d, 'email')), dataNasc: txt(pick(d, 'dataNasc', 'dataNascimento')),
    curso: txt(nameOf(d?.curso, 'nome', 'nomeCurso') ?? pick(d, 'nomeCurso')),
    turma: txt(nameOf(d?.turma, 'nomeTurma', 'nome') ?? pick(d, 'nomeTurma')),
    armario: pick(d, 'numeroArmario') ?? pick(r, 'numeroArmario', 'numero') ?? (typeof d?.armario !== 'object' ? d?.armario : undefined),
    vencimento: pick(d, 'dataFim', 'dataVencimento', 'vencimento') ?? pick(r, 'dataFim', 'dataVencimento', 'vencimento'),
    pagamento: pick(d, 'metodoPagamento', 'pagamento') ?? pick(r, 'metodoPagamento', 'pagamento'),
  };
}
