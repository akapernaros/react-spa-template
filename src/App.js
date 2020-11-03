import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { withTranslation } from "react-i18next";
import Header from './components/header/header'
import Kitchensink from "./pages/kitchensink/Kitchensink";
import {initialize} from "./shared/services";


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { render : this.initializingContent() };
    }

    /**
     * TODO Extract method to be a react functional component.
     *
     * @returns {*}
     */
    initializingContent() {
        return <div>Initializing ...</div>
    }

    /**
     * TODO Extract method to be a react functional component.
     *
     * @returns {*}
     */
    errorContent() {
        return <div>Initializing failed. Application could not be started.</div>
    }

    /**
     * TODO Extract method to be a react functional component.
     *
     * @returns {*}
     */
    rootContent() {
        return  <div>
                    <Header/>
                    <div className="App container-lg">
                        <Kitchensink/>
                    </div>
                </div>;
    }

    componentDidMount() {
        this.initApp().then(() => {
            this.setState({ render: this.rootContent() });
        }).catch((e) => {
            console.log(e);
            this.setState({ render: this.errorContent() });
        });

    }

    async initApp() {
        await initialize();
        //Add more (asynchronous) initializing stuff here.
    }

    render() {

        return (
            <div>
                { this.state.render }
            </div>
        );
    }
}

export default withTranslation()(App);
