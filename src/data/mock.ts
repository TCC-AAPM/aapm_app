export const user = { name: 'Isabella', course: 'Técnico em Desenvolvimento de Sistemas - DS2A', fullName: 'Isabella Lopes', classId: 'Turma INFO-3A' };
export const alertCard = { title: 'Atenção: documento pendente', body: 'Entregue o termo de uso assinado na secretaria para manter seu acesso ativo.', cta: 'Ver Termos →' };
export const courseCard = { label: 'Curso / Turma', title: 'Técnico em Informática', sub: 'Turma INFO-3A', tag: 'ATIVO' };
export const lockerCard = { label: 'Armário', title: 'Armário nº 47-B', sub: 'Bloco B – 2º andar', warn: 'Vence em 108 dias (20/10/2026)', tag: 'ATIVO' };
export const miniCards = [
  { label: 'Pagamento', icon: 'card-outline', value: 'Boleto bancário' },
  { label: 'Vencimento', icon: 'calendar-outline', value: '10/05/2026' },
] as const;
