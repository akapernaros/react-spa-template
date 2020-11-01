import React from "react";
import DropDownExample from "./DropDownExample";
import {withTranslation} from "react-i18next";
import ButtonExample from "./ButtonExample";
import ExpandableSectionExample from "./ExpandableSectionExample";
import TwoWayDatabingExample from "./TwoWayDatabingExample";
import ListExample from "./ListExample";
import { BackendApi } from "./BackendApi";

class Kitchensink extends React.Component {

    test() {
        alert("Test");
    }

    render() {
        return <div>
            <h1> { this.props.t('app.kitchensink.title') } </h1>
            <ButtonExample handler={ this.test }/>
            <DropDownExample/>
            <ExpandableSectionExample handler={ this.test }/>
            <TwoWayDatabingExample/>
            <ListExample/>
            <BackendApi/>
        </div>
    }
}

export default withTranslation()(Kitchensink);