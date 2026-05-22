import { GenericService } from "@/lib/generic";

type Cliente = Record<string, unknown>;

export class ClienteService extends GenericService<Cliente> {
  constructor() {
    super("api/clientes");
  }
}

export const clienteService = new ClienteService();
