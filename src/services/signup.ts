import { api, ApiError, pick } from './api';
import { flow } from './flow';
import { onlyDigits, toISO } from '../utils/masks';

const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
const find = (list: any[], text: string, ...keys: string[]) => list.find((x) => norm(String(pick(x, ...keys) ?? '')) === norm(text));
const names = (list: any[], ...keys: string[]) => list.map((x) => pick(x, ...keys)).filter(Boolean).join(', ');

/** Resolve curso/turma/termos pelos nomes digitados e envia o pré-cadastro. */
export async function submitPreCadastro() {
  const [cursos, termos] = await Promise.all([
    api<any[]>('/Cursos', { auth: false }),
    api<any[]>('/Termo/termos-ativos', { auth: false }),
  ]);
  const curso = find(cursos, flow.course, 'nome', 'nomeCurso');
  if (!curso) throw new ApiError(`Curso não encontrado. Disponíveis: ${names(cursos, 'nome', 'nomeCurso')}`, 400);
  const idCurso = pick(curso, 'idCurso', 'id');

  const turmas = await api<any[]>(`/Turmas/por-curso/${idCurso}`, { auth: false });
  const turma = find(turmas, flow.cls, 'nomeTurma', 'nome');
  if (!turma) throw new ApiError(`Turma não encontrada. Disponíveis: ${names(turmas, 'nomeTurma', 'nome')}`, 400);

  const site = termos.find((t) => pick(t, 'referencia') === 'S');
  const armario = termos.find((t) => pick(t, 'referencia') === 'A');
  if (!site || !armario) throw new ApiError('Termos indisponíveis no momento. Tente mais tarde.', 400);

  await api('/Cadastro/pre-cadastro', {
    method: 'POST', auth: false,
    body: {
      cpf: onlyDigits(flow.cpf), nome: flow.name.trim(), nomeSocial: flow.social.trim() || null,
      telefone: onlyDigits(flow.phone), email: flow.email.trim(), matricula: flow.rm.trim() || null,
      dataNasc: toISO(flow.birth), idCurso, idTurma: pick(turma, 'idTurma', 'id'),
      idTermoSite: pick(site, 'idTermo', 'id'), aceitouTermoSite: true,
      idTermoArmario: pick(armario, 'idTermo', 'id'), aceitouTermoArmario: true,
    },
  });
}
