import "./Logo.css";
import React from "react";
import logo from "../../assets/imagens/logoWeb.png"
//import logo from '../../assets/imagens/logo_editor.svg'

// tentei importar a logo deu ruim ;-;

export default function Logo(props){
    return(
        <aside className="logo">
           <a href ="/" className="logo">
                <img src ={logo} alt= "Logo"/>
           </a>
        </aside>
    )
}