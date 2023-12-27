import axios from "axios";
import { Loadinghelpers } from "../helpers/LoagindHelper";

export default class HttpService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL+"/api"
        })
        this.quantidadeRequisicoes = 0;
        this.axios.interceptors.request.use((config) => {
            this.quantidadeRequisicoes+1
            if(this.quantidadeRequisicoes === 1) {
                Loadinghelpers.exibir()
            }
            Loadinghelpers.exibir()
            const token = localStorage.getItem("token")
            if(token) {
                config.headers.Authorization = "Bearer " + token
            }
            return config
        })

        this.axios.interceptors.response.use((response) => {
            this.quantidadeRequisicoes-1
            if(this.quantidadeRequisicoes === 0) {
                Loadinghelpers.ocultar()
                return response
            }

      
        })
    }
    post(url, data) {
        return this.axios.post(url, data)
    }

    get(url) {
        return this.axios.get(url)
    }
    put(url, data) {
        return this.axios.put(url, data)
    }   
}