import { GenericService } from "@/hooks/generic";
import type Peca from "@/models/peca";

export class PecaService extends GenericService<Peca> {
  constructor() {
    super("api/pecas");
  }
}

export const pecaService = new PecaService();
