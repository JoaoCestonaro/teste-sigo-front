import { GenericService } from "@/lib/generic";

type Servico = Record<string, unknown>;

export class ServicoService extends GenericService<Servico> {
  constructor() {
    super("api/servicos");
  }
}

export const servicoService = new ServicoService();
