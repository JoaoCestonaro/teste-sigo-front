import { GenericService } from "@/lib/generic";

type Veiculo = Record<string, unknown>;

export class VeiculoService extends GenericService<Veiculo> {
  constructor() {
    super("api/veiculos");
  }
}

export const veiculoService = new VeiculoService();
