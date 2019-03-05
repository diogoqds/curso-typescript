import { NegociacaoInterface } from '../models/NegociacaoInterface';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

  importaDados(handle: HandleFunction): Promise<Negociacao[]> {
    return (
      fetch('http://localhost:8080/dados')
      .then(res => handle(res))
      .then(res => res.json())
      .then((dados: NegociacaoInterface[]) => (
        dados.map(dado => new Negociacao(new Date(), dado.montante, dado.vezes))
      ))
      .catch(error => { throw new Error(error.message) })
    )
  }
}

interface HandleFunction {
  (res: Response): Response
}