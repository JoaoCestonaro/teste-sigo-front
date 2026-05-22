import { GenericService } from "@/lib/generic";

type Marca = Record<string, unknown>;

export class MarcaService extends GenericService<Marca> {
  constructor() {
    super("api/marcas");
  }
}

export const marcaService = new MarcaService();
