import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ApplicationForm } from './components/ApplicationForm';
import {ExternalSite} from "./components/ExternalSite";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={''} element={<ExternalSite />}>
                    </Route>
                    <Route path={"/application/:id"} element={<ApplicationForm/>}>
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
