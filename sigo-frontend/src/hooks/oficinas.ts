import { GenericService } from "@/lib/generic";

type Oficina = Record<string, unknown>;

export class OficinaService extends GenericService<Oficina> {
  constructor() {
    super("api/oficinas");
  }
}

export const oficinaService = new OficinaService();
