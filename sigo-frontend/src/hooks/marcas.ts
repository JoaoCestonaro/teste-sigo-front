import { GenericService } from "@/hooks/generic";
import type Marca from "@/models/marca";

export class MarcaService extends GenericService<Marca> {
  constructor() {
    super("api/marcas");
  }
}

export const marcaService = new MarcaService();
