System.register(["../helpers/decorators/tempoExecucao"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var tempoExecucao_1, View;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tempoExecucao_1_1) {
                tempoExecucao_1 = tempoExecucao_1_1;
            }
        ],
        execute: function () {
            View = class View {
                constructor(seletor, escapar = false) {
                    this._elemento = $(seletor);
                    this._escapar = escapar;
                }
                update(model) {
                    let template = this.template(model);
                    if (this._escapar) {
                        template = template.replace(/<script>[\s\S]*?<\/script>/, '');
                    }
                    this._elemento.html(template);
                }
            };
            __decorate([
                tempoExecucao_1.tempoExecucao(true)
            ], View.prototype, "update", null);
            exports_1("View", View);
        }
    };
});