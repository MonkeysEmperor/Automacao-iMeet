import axios from 'database/DatabaseConnection'

export default class Reuniao {
    constructor ({responsavel, temperatura, inicio, fim, sala, presentes, maximo}){
        this.responsavel = responsavel;
        this.temperatura = temperatura;
        this.inicio = inicio;
        this.fim = fim;
        this.sala = sala;
        this.presentes = presentes;
        this.maximo = maximo;
    }


}