System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tempoExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                const t1 = performance.now();
                metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`O tempo de execução de ${propertyKey} foi de ${(t2 - t1) / divisor} ${unidade}`);
            };
        };
    }
    exports_1("tempoExecucao", tempoExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
