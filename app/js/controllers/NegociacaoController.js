System.register(["../views/NegociacoesView", "../views/MensagemView", "../models/Negociacoes", "../models/Negociacao", "../helpers/decorators/domInject", "../helpers/decorators/throttle", "../services/NegociacaoService", "../helpers/Utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var NegociacoesView_1, MensagemView_1, Negociacoes_1, Negociacao_1, domInject_1, throttle_1, NegociacaoService_1, Utils_1, NegociacaoController, DiaDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (NegociacoesView_1_1) {
                NegociacoesView_1 = NegociacoesView_1_1;
            },
            function (MensagemView_1_1) {
                MensagemView_1 = MensagemView_1_1;
            },
            function (Negociacoes_1_1) {
                Negociacoes_1 = Negociacoes_1_1;
            },
            function (Negociacao_1_1) {
                Negociacao_1 = Negociacao_1_1;
            },
            function (domInject_1_1) {
                domInject_1 = domInject_1_1;
            },
            function (throttle_1_1) {
                throttle_1 = throttle_1_1;
            },
            function (NegociacaoService_1_1) {
                NegociacaoService_1 = NegociacaoService_1_1;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new Negociacoes_1.Negociacoes();
                    this._negociacoesView = new NegociacoesView_1.NegociacoesView('#negociacoesView');
                    this._mensagemView = new MensagemView_1.MensagemView('#mensagemView');
                    this._negociacaoService = new NegociacaoService_1.NegociacaoService();
                }
                adiciona() {
                    let data = new Date(this._inputData.val().toString().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update('Somente negociações feitas em dias úteis');
                        return;
                    }
                    const negociacao = new Negociacao_1.Negociacao(data, parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negociacoes.adiciona(negociacao);
                    Utils_1.imprime(negociacao, this._negociacoes);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação criada com sucesso!');
                }
                importarDados() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const resOk = (res) => {
                                if (res.ok) {
                                    return res;
                                }
                                throw new Error(res.statusText);
                            };
                            const negociacoesParaImportar = yield this._negociacaoService.importaDados(resOk);
                            const negociacoesImportadas = this._negociacoes.listaNegociacoes();
                            negociacoesParaImportar
                                .filter(negociacao => !negociacoesImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                        catch (error) {
                            this._mensagemView.update('Não foi possível importar');
                        }
                    });
                }
                _ehDiaUtil(data) {
                    return (data.getDay() !== DiaDaSemana.Domingo && data.getDay() !== DiaDaSemana.Sabado);
                }
            };
            __decorate([
                domInject_1.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                domInject_1.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                domInject_1.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                throttle_1.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                throttle_1.throttle()
            ], NegociacaoController.prototype, "importarDados", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
