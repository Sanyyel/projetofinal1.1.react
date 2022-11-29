import React from "react";
import './CrudPerfis.css';
import Main from '../template/Main';
import axios from "axios";
import {useEffect, useState } from "react";

const title = "Perfil dos Funcionários";

const urlPerfis= "http://localhost:5272/api/funcionario";

export default function CrudPerfis(props){

    const [funcMetas, setFuncMetas] = useState({
        id: 0, nome: "", metas: 0
    })

    return(
        <Main title={title}>
            {this.renderTable()}
        </Main>
        )
}