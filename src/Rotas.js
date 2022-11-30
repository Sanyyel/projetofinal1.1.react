import React, { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";

import Main from "./components/template/Main";
import CrudFunc from "./components/CrudFunc/CrudFunc";
import CrudPerfis from "./components/CrudPerfis/CrudPerfis";
import Login from "./components/Login/Login";
import AuthService from "./components/services/AuthService";
import Logout from "./components/Logout/Logout";
import CrudCarometro from "./components/CrudCarometro/CrudCarometro";

export default function Rotas(){

    const [currentUser, setCurrentUser] = useState(undefined);

        useEffect(() => {
            const user = AuthService.getCurrentUser();
            if(user){
                setCurrentUser(user);
            }
        }, []);

    return(
        <Routes>
            <Route exact path="/"
                element={
                    <Main title="Bem Vindo(a)!">
                        <div>Cadastro de funcionários, perfis e metas.</div>
                    </Main>
                }
                />

            {currentUser ? (
                <Route exact path="/funcionario"
                    element={<CrudFunc/>}
                    />
            ) : (
                <Route exact path="/funcionario"
                    element={
                        <Main title="Funcionários">
                            <div>Não autorizado!</div>
                        </Main>
                    } 
                />
            )}

            {currentUser ? (
                <Route exact path="/perfis"
                element={<CrudPerfis/>}
                />
            ) : (
                <Route exact path="/perfis"
                    element={
                        <Main title="Perfis">
                            <div>Não autorizado!</div>
                        </Main>
                    } 
                />
            )}

            <Route exact path="/carometro"
                element={<CrudCarometro/>} 
            />

            <Route path='/login' element={<Login/>}/>

            <Route path='/logout' element={<Logout/>} />

            <Route path='*' to='/' />
        </Routes>
    )
}