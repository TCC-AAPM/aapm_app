/** Estado em memória do fluxo "Contratar Serviço" e da recuperação de senha. */
const empty = { birth: '', name: '', social: '', cpf: '', email: '', phone: '', rm: '', course: '', cls: '', resetEmail: '' };
export const flow = { ...empty };
export const resetFlow = () => Object.assign(flow, empty);
