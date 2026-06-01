import { GenericService } from "@/hooks/generic";
import type Cliente from "@/models/cliente";

export class ClienteService extends GenericService<Cliente> {
  constructor() {
    super("api/clientes");
  }
}

export const clienteService = new ClienteService();
