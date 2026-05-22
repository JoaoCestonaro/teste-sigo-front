import { GenericService } from "@/lib/generic";

type Telefone = Record<string, unknown>;

export class TelefoneService extends GenericService<Telefone> {
  constructor() {
    super("api/telefones");
  }
}

export const telefoneService = new TelefoneService();
