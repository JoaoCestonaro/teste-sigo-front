export type FuncionarioServico = {
  IdFuncionario: number;
  IdServico: number;
  TempoDec: string;
};

export default interface Servico {
  Id: number;
  Nome: string;
  Descricao: string;
  Valor: number;
  Garantia: string;
  IdOficina?: number | null;
  Funcionario_Servicos: FuncionarioServico[];
}
