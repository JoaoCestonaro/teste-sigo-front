export default interface Funcionario {
  Id: number;
  Nome: string;
  Cpf: string;
  Cargo: string;
  Senha: string;
  Email: string;
  Situacao: number;
  IdOficina?: number | null;
  Role?: string;
}
