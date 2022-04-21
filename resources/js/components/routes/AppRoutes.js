import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../pages/external/Login";
import { Forgot } from "../pages/external/Forgot";
import { Register } from "../pages/external/Register";
import { Home } from "../pages/internal/Home";
import { NotFound } from "../pages/NotFound";

export function AppRoutes(){

    return(

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/home" element = {<Home />} />
                <Route path="*" element = {<NotFound />} />
            </Routes> 
        </BrowserRouter>
        
    )

}