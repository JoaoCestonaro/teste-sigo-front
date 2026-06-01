import { GenericService } from "@/hooks/generic";
import type Funcionario from "@/models/funcionario";

export class FuncionarioService extends GenericService<Funcionario> {
  constructor() {
    super("api/funcionarios");
  }
}

export const funcionarioService = new FuncionarioService();
