import { Imprimivel } from './Imprimivel'
import { Igualavel } from './Igualavel'

export interface ImprimivelIgualavel<T> extends Imprimivel, Igualavel<T> {

}