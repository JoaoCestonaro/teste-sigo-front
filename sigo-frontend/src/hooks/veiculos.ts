import { GenericService } from "@/hooks/generic";
import type Veiculo from "@/models/veiculo";

export class VeiculoService extends GenericService<Veiculo> {
  constructor() {
    super("api/veiculos");
  }
}

export const veiculoService = new VeiculoService();
