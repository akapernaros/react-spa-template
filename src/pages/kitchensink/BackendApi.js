import React from "react";
import { withTranslation, Trans } from "react-i18next";
import { withApiService } from "../../shared/services/api";
import { Widget } from "../../shared/components";

class BackendApi extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.loadUsers = this.loadUsers.bind(this);
        this.displayUsers = this.displayUsers.bind(this);
    }

    loadUsers() {
        this.props.api.get("/users",(res) => {
            console.log(res.data);
            this.setState({ users: res.data })});
    }

    displayUsers() {
        return this.state.users.map((entry) => {
            return <div className="row" key={ entry.id }>
                { entry.name } - { entry.email }
            </div>
        })
    }

    render() {
        return <div className="row py-4">
                <div className="col-lg">
                    <Widget.ExpandableSection title={ this.props.t('app.kitchensink.backend.title') } expanded={ false }>
                        <div className="row py-2">
                            <div className="col-lg-2">
                                <Widget.Button size= { Widget.SIZE.S } onClick={ this.loadUsers }><Trans>app.kitchensink.backend.button</Trans> </Widget.Button>
                            </div>
                            <div className="col-lg-8 pt-1">
                                <span className="text-dark">{ this.props.t('app.kitchensink.backend.text') }</span>
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-lg">
                                <Widget.List title={ this.props.t('app.kitchensink.backend.result-title')}
                                             content={ this.state.users }
                                             keyAttribute={ "id" }
                                             render={ element => (<UserContent user={ element }/>)} />
                            </div>
                        </div>
                    </Widget.ExpandableSection>
                </div>
        </div>
    }
}

class UserContent extends React.Component {

    render() {
        return <div className="col-lg">
            { this.props.user.name }
        </div>
    }
}

export default withApiService(withTranslation()(BackendApi));