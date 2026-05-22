import { GenericService } from "@/lib/generic";

type Peca = Record<string, unknown>;

export class PecaService extends GenericService<Peca> {
  constructor() {
    super("api/pecas");
  }
}

export const pecaService = new PecaService();
