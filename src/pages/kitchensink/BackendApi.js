import React from "react";
import Api from "../../shared/services/api";
import { Widget } from "../../shared/components";

export class BackendApi extends React.Component {

    constructor(props) {
        super(props);
        this.api = Api;
        this.state = { users: [] };
        this.loadUsers = this.loadUsers.bind(this);
        this.displayUsers = this.displayUsers.bind(this);
    }

    loadUsers() {
        this.api.get("/users" , (res) => {
            console.log(res.data);
            this.setState({ users: res.data });
        });
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
                <div className="col">
                    <Widget.ExpandableSection title={ "Test" } expanded={ false }>
                        <div className="row">
                            <div className="col">
                                <Widget.Button onClick={ this.loadUsers }>Test 2</Widget.Button>
                                { this.displayUsers() }
                            </div>
                        </div>
                    </Widget.ExpandableSection>
                </div>
        </div>
    }
}