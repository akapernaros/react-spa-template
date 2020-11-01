import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { withTranslation } from "react-i18next";
import Header from './components/header/header'
import Kitchensink from "./pages/kitchensink/Kitchensink";


export class App extends React.Component {

    render() {

        return (
            <div>
                <Header/>
                <div className="App container-lg">
                    <Kitchensink/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(App);
