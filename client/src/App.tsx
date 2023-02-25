import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ApplicationForm } from './components/ApplicationForm';
import {ExternalSite} from "./components/ExternalSite";

function App() {
    return (
        <div className="App">
            TODO something to get here with some autofilled properties
            TODO close and reopen and it stays
            TODO below fields
            TODO age in backend


            submit

            Your price is butts

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
