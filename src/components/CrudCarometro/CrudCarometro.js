import React, { useEffect, useState } from "react";
import './CrudCarometro.css';
import Main from '../template/Main';
import axios from "axios";

const title = "Carômetro";

const urlAPI = "http://localhost:5272/api/Funcionario"

const funcionariosPerfil = [];

funcionariosPerfil[0] = 'https://cdn-icons-png.flaticon.com/512/4202/4202841.png'
funcionariosPerfil[1] = 'https://cdn-icons-png.flaticon.com/512/4202/4202847.png'
funcionariosPerfil[2] = 'https://cdn-icons-png.flaticon.com/512/4202/4202848.png'
funcionariosPerfil[3] = 'https://cdn-icons-png.flaticon.com/512/4202/4202838.png'
funcionariosPerfil[4] = 'https://cdn-icons-png.flaticon.com/512/4202/4202840.png'
funcionariosPerfil[5] = 'https://cdn-icons-png.flaticon.com/512/4202/4202844.png'

export default function CrudCarometro(){
    const [funcionario, setFuncionario] = useState(
        {id: 0, nome: '', setor: '', metas: 0, funcMes: 0}
    )
    
    const [listaFunc, setListaFunc] = useState(
        []
    )

    const [listaAtt, setListaAtt] = useState(
        []
    )

    useEffect(() =>{
        axios(urlAPI).then(resp =>{
            console.log(resp.data)
            setListaFunc(resp.data)
        })
    })

    const attListaFunc = async (event) => {
        const setor = event.target.value;
        funcionario.setor = String(setor);
        const listafuncionario = listafuncionario.filter(
            (funcionario) => funcionario.setor == setor
        );

        console.log(listafuncionario)
        setListaAtt(listafuncionario)
    }

    const renderForm = () =>{
        return(
            <div className="inclui-container">
                <label>Procurar p/ setor:</label>
                <select name="setor" onChange={e => {attListaFunc(e)}}>
                    <option selected value="setor">Selecione o setor:</option>
                    {listaFunc.map(
                        (funcionario) =>(
                            <option key={funcionario.id} name="setor" value={funcionario.setor}>
                                {funcionario.setor}
                            </option>
                        )
                    )}
                </select>
            </div>
        )
    }

    const renderCards = () =>{
        return(
            <div>
                {listaAtt.map((funcionario) =>(
                    <div key={funcionario.id} className="card draw-border">
                        <img className="card__image" src={funcionariosPerfil[Math.floor(Math.random() * funcionariosPerfil.length)]}/>
                        <span className="card-title">{funcionario.nome}</span>
                        <span className="card-description">Setor: {funcionario.setor}</span>
                    </div>
                ))}
            </div>
        )
    }

    return(
        <Main title={title}>
            {renderForm()}
            {renderCards()}
        </Main>
        )
}