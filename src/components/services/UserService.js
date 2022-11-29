import axios from "axios";
import auth from "./AuthService";

const api_url = "http://localhost:5272/api/"


const getPublicContent = () =>{
    // return axios.get(api_url + 'carometro')
}

const getPublicCarometro = {
    getFuncionarios: () =>{
        return axios.get(api_url + 'carometro/funcionario')
    },
}

const headerAuthorization = () =>{
    return {
        headers: {
            Authorization: "Bearer " + auth.getCurrentUser().token
        }
    }
}
const getBoardFuncionarios = async () =>{
    return await axios.get(api_url + 'funcionario', headerAuthorization())
}

const salvarFuncionario = async (method, url, funcionario) =>{
    return await axios[method](url, funcionario, headerAuthorization())
}

const deletarFuncionario = async (id) =>{
    return await axios.delete(api_url + "funcionario/" + id, headerAuthorization())
}

const UserService = {
    getPublicCarometro,
    getBoardFuncionarios: getBoardFuncionarios,
    salvarFuncionario: salvarFuncionario,
    deletarFuncionario: deletarFuncionario
}

export default UserService