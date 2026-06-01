import { GenericService } from "@/hooks/generic";
import type Telefone from "@/models/telefone";

export class TelefoneService extends GenericService<Telefone> {
  constructor() {
    super("api/telefones");
  }
}

export const telefoneService = new TelefoneService();
