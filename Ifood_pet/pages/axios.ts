//AXIOS é o resposável por fazer a ligação com a API
import axios from 'axios'
//configurando o endereço da API
const axiosConfig = axios.create({baseURL:'https://dummyjson.com'})
//Export pra deixar disponível para uso
export default axiosConfig