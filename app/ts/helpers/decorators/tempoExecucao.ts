export function tempoExecucao(emSegundos: boolean = false) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;

    descriptor.value = function(...args: any[]) {
      let unidade = 'ms';
      let divisor = 1;

      if(emSegundos) {
        unidade = 's';
        divisor = 1000;
      }

      const t1 = performance.now();
      metodoOriginal.apply(this, args);
      const t2 = performance.now();

      console.log(`O tempo de execução de ${propertyKey} foi de ${(t2 - t1)/divisor} ${unidade}`);
    }
  }
}