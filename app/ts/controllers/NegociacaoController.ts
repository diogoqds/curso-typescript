import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { Negociacoes } from '../models/Negociacoes';
import { Negociacao } from '../models/Negociacao';
import { domInject } from '../helpers/decorators/domInject';
import { throttle } from '../helpers/decorators/throttle';
import { NegociacaoService } from '../services/NegociacaoService';
import { imprime } from '../helpers/Utils';

export class NegociacaoController {

  @domInject('#data')
  private _inputData: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade: JQuery;

  @domInject('#valor')
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');
  private _negociacaoService = new NegociacaoService();

  @throttle()
  adiciona() {

    let data = new Date(this._inputData.val().toString().replace(/-/g, ','));

    if(!this._ehDiaUtil(data)) {
      this._mensagemView.update('Somente negociações feitas em dias úteis');
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val().toString()),
      parseFloat(this._inputValor.val().toString())
    );

    this._negociacoes.adiciona(negociacao);
    imprime(negociacao, this._negociacoes);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação criada com sucesso!');
  }

  @throttle()
  async importarDados() {
    try {
      const resOk = (res: Response) => {
        if(res.ok) {
          return res;
        }
        throw new Error(res.statusText)
      }

      const negociacoesParaImportar = await this._negociacaoService.importaDados(resOk);
      const negociacoesImportadas = this._negociacoes.listaNegociacoes();
      negociacoesParaImportar
        .filter(negociacao =>
          !negociacoesImportadas.some(jaImportada => negociacao.ehIgual(jaImportada))
        )
        .forEach(negociacao => this._negociacoes.adiciona(negociacao))
        this._negociacoesView.update(this._negociacoes)
    } catch (error) {
      this._mensagemView.update('Não foi possível importar');
    }
  }

  private _ehDiaUtil(data: Date) {
    return (data.getDay() !== DiaDaSemana.Domingo && data.getDay() !== DiaDaSemana.Sabado)
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terça,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}