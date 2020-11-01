import { Widget } from "../../shared/components";
import React from "react";
import { withTranslation } from "react-i18next";
import { WorldData } from "./Mockdata";
import {ChatQuote, PlusCircle} from 'react-bootstrap-icons';


class ListExample extends React.Component {
    constructor(props) {
        super(props);
        withTranslation(ListContent);
        this.state = { data: WorldData };
        this.getHeaderContent = this.getHeaderContent.bind(this);
    }

    sayHello() {
        alert("Action.");
    }

    getHeaderContent() {
        return <div className="nav bg-primary p-2">
            <div className="nav-item col">
                <h4 className="font-weight-bold text-light">  { this.props.t('app.kitchensink.list.header-title') } </h4>
            </div>
            <div className="justify-content-end">
                <div className="nav-item col">
                    <Widget.Button size={ Widget.SIZE.S } onClick={ this.sayHello } type={ Widget.BUTTON_TYPE.SUBMIT } ><PlusCircle size="20"  /></Widget.Button>
                </div>
            </div>
        </div>
    }

    render() {
        return <div className="row py-4">
                <div className="col-lg pt-4">
                    <Widget.ExpandableSection title={ this.props.t('app.kitchensink.list.title') } expanded={false}>
                        <div className="row pt-2">
                            <div className="col-lg">
                                <Widget.List
                                    content={ this.state.data }
                                    keyAttribute={ "id" }
                                    title={ this.props.t('app.kitchensink.list.list-title')}
                                    render={ element => (<ListContent entry={ element }/>)} />
                            </div>
                            <div className="col-lg">
                                <Widget.List
                                    content={ this.state.data }
                                    headerContent={ this.getHeaderContent }
                                    keyAttribute={ "id" }
                                    render={ element => (<ListContent entry={ element }/>)} />
                            </div>
                        </div>
                    </Widget.ExpandableSection>
                </div>

        </div>
    }
}

class ListContent extends React.Component {

    sayHello(entry) {
        alert(entry.greeting);
    }

    render() {
        return <div>
                <div className="row">
                    <div className="col-lg">
                        <span className="text-dark">{ this.props.entry.name }</span>
                    </div>
                    <div className="col-lg">
                        { this.props.entry.diameter } km
                    </div>
                    <div className="col-lg">
                        <Widget.Button size={ Widget.SIZE.S } onClick={ this.sayHello.bind(this, this.props.entry) }><ChatQuote className="mb-1" size="20" /></Widget.Button>
                    </div>
                </div>
        </div>
    }
}

export default withTranslation()(ListExample);