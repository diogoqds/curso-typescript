import { Negociacao } from './Negociacao';
import { ImprimivelIgualavel } from './ImprimivelIgualavel';

export class Negociacoes implements ImprimivelIgualavel<Negociacoes> {

  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao) {
    this._negociacoes.push(negociacao);
  }

  listaNegociacoes(): Negociacao[] {
    return ([] as Negociacao[]).concat(this._negociacoes);
  }

  paraTexto(): void {
    console.log('Impressão');
    console.log(JSON.stringify(this._negociacoes));
  }

  ehIgual(negociacoes: Negociacoes): boolean {
    return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes.listaNegociacoes());
  }
}