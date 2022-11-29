import React from "react";
import './CrudCarometro.css';
import Main from '../template/Main';
import axios from "axios";

const title = "Funcionários do mes";

export default function CrudCarometro(props){
    return(
        <Main title={title}>
            {this.renderTable()}
        </Main>
        )
}