import { Funcionario } from "../interfaces/Funcionarios";
/**
 * Filters an array of employees based on a search term.
 * @param funcionarios The array of employees to filter.
 * @param termoPesquisa The search term to filter by.
 * @returns An array of employees that match the search term.
 */
export function filtrarFuncionarios(
  funcionarios: Funcionario[],
  termoPesquisa: string
): Funcionario[] {
  const termoSemAcentos: string = removerAcentos(termoPesquisa.toLowerCase());

  return funcionarios.filter((funcionario: Funcionario) => {
    const nomeSemAcentos: string = removerAcentos(funcionario.name.toLowerCase());
    const cargoSemAcentos: string = removerAcentos(funcionario.job.toLowerCase());
    const telefoneSemAcentos: string = removerAcentos(funcionario.phone.toLowerCase());

    return (
      nomeSemAcentos.includes(termoSemAcentos) ||
      cargoSemAcentos.includes(termoSemAcentos) ||
      telefoneSemAcentos.includes(termoSemAcentos)
    );
  });
}

/**
 * Removes accents from a string.
 * @param s The string from which to remove accents.
 * @returns The string with accents removed.
 */
function removerAcentos(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
