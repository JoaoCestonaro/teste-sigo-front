import { GenericService } from "@/hooks/generic";
import type Pedido from "@/models/pedido";

export class PedidoService extends GenericService<Pedido> {
  constructor() {
    super("api/pedidos");
  }
}

export const pedidoService = new PedidoService();
