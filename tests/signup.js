import http from 'k6/http'
import { sleep, check } from 'k6'
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';


export const options = {
    vus: 10,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2 segundos
        http_req_failed: ['rate<0.01'] // 1% das requisiçoes podem ocorrer erro
    }
}


export default function () {
    const url = 'http://localhost:3333/signup'

    const payload = JSON.stringify(
        {
            email: `${uuidv4().substring(24)}@qa.teste.com`,
            password: 'pwd123'
        })
    
    const headers = {
        'headers':
            {
            'Content-Type': 'application/json'
            }
        }

    const response = http.post(url,payload,headers)

    check(response, {
        'status code should be 201': (res) => res.status === 201
    })

    sleep(1)
}
