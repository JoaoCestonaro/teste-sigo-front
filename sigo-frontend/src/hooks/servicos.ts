import { GenericService } from "@/hooks/generic";
import type Servico from "@/models/servico";

export class ServicoService extends GenericService<Servico> {
  constructor() {
    super("api/servicos");
  }
}

export const servicoService = new ServicoService();
