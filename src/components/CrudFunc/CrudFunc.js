//import React, { useEffect } from "react";
import './CrudFunc.css';
import Main from '../template/Main';
import axios, { spread } from "axios";
import {useEffect, useState } from "react";

import UserService from '../services/UserService';
//import 'materialize/materialize.css'

const title = "Cadastro de Funcionários";

const urlFunc = "http://localhost:5272/api/Funcionario";
//nome pode estar errado, verificar depois

//const urlPerfis= "http://localhost:5272/api/perfis";

const funcionariosPerfil = [];

funcionariosPerfil[0] = 'https://cdn-icons-png.flaticon.com/512/4202/4202841.png'
funcionariosPerfil[1] = 'https://cdn-icons-png.flaticon.com/512/4202/4202847.png'
funcionariosPerfil[2] = 'https://cdn-icons-png.flaticon.com/512/4202/4202848.png'
funcionariosPerfil[3] = 'https://cdn-icons-png.flaticon.com/512/4202/4202838.png'
funcionariosPerfil[4] = 'https://cdn-icons-png.flaticon.com/512/4202/4202840.png'
funcionariosPerfil[5] = 'https://cdn-icons-png.flaticon.com/512/4202/4202844.png'


export default function CrudFunc(){

    const [funcionario, setFuncionario] = useState({
        id: 0, nome: '', setor: '', metas: 0, funcMes: 0
    })
    //para o admin ver

    const [listaFunc, setListaFunc] = useState([])

    useEffect(() => {
        axios(urlFunc).then(resp =>{
            console.log(resp.data)
            setListaFunc(resp.data)
        })
    }, [])

    const limpar = () =>{
        setFuncionario(funcionario);
    }

    const salvar = () =>{
        funcionario.id = Number(funcionario.id);
        const metodo = funcionario.id ? "put" : "post";
        const url = funcionario.id ? `${urlFunc}/${funcionario.id}` : urlFunc;

        axios[metodo](url, funcionario)
            .then(resp =>{
                const listaFunc = getListaAtualizada(resp.data)
                setFuncionario({funcionario})
                setListaFunc({listaFunc})
            })
    }

    const getListaAtualizada = (funcionario, add = true) =>{
        const listanova = listaFunc.filter(f => f.id !== funcionario.id);
        if(add){
            listanova.unshift(funcionario);

        }
        return listanova;
    }

    const dadosdoinput = e =>{
        const {name, value} = e.target
            setFuncionario({
                ...funcionario,
                    [name] : value
            })
    }

    const carregar = (funcionario) =>{
        setFuncionario({funcionario});
    }

    const remover = (funcionario) =>{
        const url = urlFunc + "/" + funcionario.id;
        if(window.confirm("Confirma remoção do funcionário: " + funcionario.nome)){
            console.log("Entrou no confirm.");

            axios["delete"](url, funcionario)
                .then(resp =>{
                    const listaFunc = getListaAtualizada(funcionario, false)
                    setFuncionario({funcionario: funcionario.setFuncionario(funcionario), listaFunc})
                })
        }
    }

    const renderForm = () =>{
        return(
            <div className='inclui-container'>
                <label> Nome de funcionário: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do funcionário"
                    className="form-input"
                    name="nome"
                    value={funcionario.nome}
                    onChange={dadosdoinput}/>
                
                <label> Setor: </label>
                <input
                    type="text"
                    id="setor"
                    placeholder="Nome do setor"
                    className="form-input"
                    name="setor"
                    value={funcionario.setor}
                    onChange={dadosdoinput}/>
                
                <label> Metas: </label>
                <input
                    type="number"
                    id="metas"
                    placeholder="0 ou 1"
                    className="form-input"
                    name="metas"
                    value={funcionario.metas}
                    onChange={dadosdoinput}/>

                <label> Funcionário do Mês: </label>
                <input
                    type="number"
                    id="funcmes"
                    placeholder="0 ou 1"
                    className="form-input"
                    name="funcmes"
                    value={funcionario.funcMes}
                    onChange={dadosdoinput}/>
                
                <button className="btnSalvar"
                    onClick={e=> salvar(e)}>
                    Salvar
                </button>

                <button className="btnCancelar"
                    onClick={e=> limpar(e)}>
                    Cancelar
                </button>
            </div>
        )
    }

    const renderTable = () =>{
        return(
            <div className='listagem'>
                <table className="listaCursos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloCodCurso">Nome de funcionário</th>
                            <th className="tabTituloNomeCurso">Setor</th>
                            <th className="tabTituloPeriodo">Metas</th>
                            <th className="tabTituloPeriodo">Funcionário do Mês</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {listaFunc.map((funcionario) =>
                        <tr key={funcionario.id}>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.setor}</td>
                            <td>{funcionario.metas}</td>
                            <td>{funcionario.funcMes}</td>
                            <td>
                                <button onClick={() => carregar(funcionario)}>
                                    Altera
                                </button>
                            </td>
                            <td>
                                <button onClick={() => remover(funcionario)}>
                                    Remove
                                </button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <Main title={title}>
            {renderForm()}
            {renderTable()}
        </Main>
    )

}