import { GenericService } from "@/hooks/generic";
import type Oficina from "@/models/oficina";

export class OficinaService extends GenericService<Oficina> {
  constructor() {
    super("api/oficinas");
  }
}

export const oficinaService = new OficinaService();
