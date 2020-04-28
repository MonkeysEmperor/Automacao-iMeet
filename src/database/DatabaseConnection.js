

const axios = require("axios").default;
const https = require("https");
// const url = 'https://apiautomacao2020.azurewebsites.net/';
const url = 'localhost:5000/'

const optionsGet = {
    hostname: url,
    path: '/',
    port: 5000,
    method: 'GET',
}
axios.defaults.baseURL = 'https://apiautomacao2020.azurewebsites.net/';

const config = {

}

/* const get = (path) => {
    const promise = new Promise(function(resolve, reject) {
        https.request(console.log(Object.assign(optionsGet, {path : path})), res => {
            res.on('data', d =>{
                resolve(d);
            })
            res.on('error', e => {
                reject(e);
            })
        });
    });
    return promise;
} */

export const horasReservadasHoje = ({ dia } = { dia: '08/02/2019' }) => {
    const endpoint = 'horasreservadashoje?dia=' + dia;
    return axios.get(endpoint);
}

export const pessoasEmReuniao = ({ dia, hora } = { dia: '08/02/2019', hora: '15:00' }) => {
    const endpoint = `pessoasemreuniao?dia=${dia}&hora=${hora}`;
    return axios.get(endpoint);
}

export const reunioesPorHora = ({ dia } = { dia: '08/02/2019' }) => {
    const endpoint = 'reunioesporhora?dia=' + dia;
    return axios.get(endpoint);
}
export const reunioesPorDia = ({ dia } = { dia: '08/02/2019' }) => {
    const endpoint = 'reunioespordia?dia=' + dia;
    return axios.get(endpoint);
}
export const energiaMesPassado = ({ dia } = { dia: '08/04/2019' }) => {
    const endpoint = 'energiamespassado?dia=' + dia;
    return axios.get(endpoint);
}
export const energiaMesPassadoPorEquipamento = ({ dia } = { dia: '08/04/2019' }) => {
    const endpoint = 'energiamespassadoporequipamento?dia=' + dia;
    return axios.get(endpoint);
/*     return new Promise((resolve, reject) => setTimeout(() => resolve({
        data:
        {
            "energia_total": 1296.059839192906,
            "energia_iluminacao": 126.43578881945751,
            "energia_rede": 157.56095658142382,
            "energia_servidor": 49.399237021489945,
            "energia_arcond": 525.8166240498223,
            "energia_bancadas": 322.4636217483758
        }
    }), 5000)) */
}
export const energiaUltimaSemana = ({ dia } = { dia: '08/04/2019' }) => {
    const endpoint = 'energiaultimasemana?dia=' + dia;
    console.log(endpoint);
    return axios.get(endpoint);
    /* return new Promise((resolve, reject) => setTimeout(() => resolve({
        data:
        {
            "Monday": 72.02753259348698,
            "Sunday": 24.611056309906733,
            "Saturday": 24.62495611791769,
            "Friday": 56.018783602773766,
            "Thursday": 51.15973627471261,
            "Wednesday": 60.91077723768455,
            "Tuesday": 76.61951663639896
        }
    }), 5000)) */
}
