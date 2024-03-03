import { Funcionario } from "../interfaces/Funcionarios";

export function filtrarFuncionarios(
  funcionarios: Funcionario[],
  termoPesquisa: string
): Funcionario[] {
  const termoSemAcentos: string = removerAcentos(termoPesquisa.toLowerCase());

  return funcionarios.filter((funcionario: Funcionario) => {
    const nomeSemAcentos: string = removerAcentos(funcionario.name.toLowerCase());
    const cargoSemAcentos: string = removerAcentos(funcionario.job.toLowerCase());
    const telefoneSemAcentos: string = removerAcentos(
      funcionario.phone.toLowerCase()
    );

    return (
      nomeSemAcentos.includes(termoSemAcentos) ||
      cargoSemAcentos.includes(termoSemAcentos) ||
      telefoneSemAcentos.includes(termoSemAcentos)
    );
  });
}

function removerAcentos(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
