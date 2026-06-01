import type Telefone from "@/models/telefone";

export default interface Cliente {
  Id: number;
  Nome: string;
  Email: string;
  senha: string;
  Cpf_Cnpj: string;
  Obs: string;
  razao: string;
  DataNasc: string;
  Numero: number;
  Rua: string;
  Cidade: string;
  Cep: string;
  Bairro: string;
  Estado: string;
  Pais: string;
  Complemento: string;
  Sexo: number;
  TipoCliente: number;
  Situacao: number;
  Telefones: Telefone[];
}
