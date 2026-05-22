import { GenericService } from "@/lib/generic";

type Funcionario = Record<string, unknown>;

export class FuncionarioService extends GenericService<Funcionario> {
  constructor() {
    super("api/funcionarios");
  }
}

export const funcionarioService = new FuncionarioService();
