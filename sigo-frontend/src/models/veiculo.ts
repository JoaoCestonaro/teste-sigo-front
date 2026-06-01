export default interface Veiculo {
  Id: number;
  NomeVeiculo: string;
  TipoVeiculo: string;
  PlacaVeiculo: string;
  ChassiVeiculo: string;
  AnoFab: number;
  Quilometragem: number;
  Combustivel: string;
  Seguro: string;
  Cor: string;
  ClienteId: number;
  Situacao: number;
}
