import { GenericService } from "@/lib/generic";

type Pedido = Record<string, unknown>;

export class PedidoService extends GenericService<Pedido> {
  constructor() {
    super("api/pedidos");
  }
}

export const pedidoService = new PedidoService();
