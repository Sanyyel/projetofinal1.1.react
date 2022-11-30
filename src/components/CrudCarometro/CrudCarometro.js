import React, { useEffect, useState, Component } from "react";
import './CrudCarometro.css';
import Main from '../template/Main';
import axios from "axios";
import UserService from "../services/UserService";

const title = "Carômetro";

const urlAPI = "http://localhost:5272/api/Funcionario"

const funcionariosPerfil = [];

funcionariosPerfil[0] = 'https://cdn-icons-png.flaticon.com/512/4202/4202841.png'
funcionariosPerfil[1] = 'https://cdn-icons-png.flaticon.com/512/4202/4202847.png'
funcionariosPerfil[2] = 'https://cdn-icons-png.flaticon.com/512/4202/4202848.png'
funcionariosPerfil[3] = 'https://cdn-icons-png.flaticon.com/512/4202/4202838.png'
funcionariosPerfil[4] = 'https://cdn-icons-png.flaticon.com/512/4202/4202840.png'
funcionariosPerfil[5] = 'https://cdn-icons-png.flaticon.com/512/4202/4202844.png'

const initialState = {
    funcMetas: {id: 0, nome:'', metas: 0},
    lista: []
}

export default class CrudCarometro extends Component{
    state = {...initialState}

    componentDidMount() {
        axios(urlAPI).then(resp => {
        console.log(resp.data)
        this.setState({lista : resp.data})
        })
        }

        limpar() {
            this.setState({ funcMetas: initialState.funcMetas });
        }

        salvar() {
            const func = this.state.funcMetas;
            func.id = Number(func.id);
            const metodo = 'post';
            axios[metodo](urlAPI, func)
            .then(resp => {
            const lista = this.getListaAtualizada(resp.data)
            this.setState({ func: initialState.funcMetas, lista })
            })
        }
        
        getListaAtualizada(funcMetas) {
                const lista = this.state.lista.filter(a => a.id !== funcMetas.id);
                lista.unshift(funcMetas);
                return lista;
        }

        atualizaCampo(event) {
            const func = { ...this.state.func };
            func[event.target.name] = event.target.value;
            //atualizar o state
            this.setState({ func });
        }

        renderForm() {
            return (
            <div className="inclui-container">
            <label> ID: </label>
            <input
            type="text"
            id="ID"
            placeholder="Id do funcionário"
            className="form-input"
            name="id"
            value={this.state.funcMetas.id}
            onChange={ e => this.atualizaCampo(e)}
            />

            <label> Nome: </label>
            <input
            type="text"
            id="nome"
            placeholder="Nome do funcionario"
            className="form-input"
            name="nome"
            
            value={this.state.funcMetas.nome}
            
            onChange={ e => this.atualizaCampo(e)}
            />
            <label> Metas: </label>
            <input
            type="number"
            id="metas"
            placeholder="0"
            className="form-input"
            name="metas"

            value={this.state.funcMetas.metas}
            onChange={ e => this.atualizaCampo(e)}
            />
            <button className="btnSalvar"
            onClick={e => this.salvar(e)} >
            Salvar
            </button>
            <button className="btnCancelar"
            onClick={e => this.limpar(e)} >
            Cancelar
            </button>
            </div>
            )
        }

    renderTable() {
        return (
        <div className="lista">
            <table className="listaAlunos" id="tblListaAlunos">
                <thead>
                <tr className="Tabela">
                <th className="tabNome">Nome</th>
                <th className="tabSetor">Setor</th>
                
                </tr>
                </thead>
        <tbody>
        {this.state.lista.map(
        (funcMetas) =>
        
        <tr key={funcMetas.id}>
            <td>{funcMetas.nome}</td>
            <td>{funcMetas.setor}</td>
        
        </tr>
        )}
        </tbody>
            </table>
        </div>
        )
        }
        render() {
            return (
            <Main title={title}>
            {this.renderTable()}
            </Main>
            )
        }
    }

            
        
    

    
        
    

    
